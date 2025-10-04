"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  FaExclamationTriangle,
  FaChartLine,
  FaLeaf,
  FaSpinner,
} from "react-icons/fa";
import { trainAndPredict } from "@/lib/ai-prediction";

interface Metrics {
  population: number;
  pollution: number;
  greenScore: number;
}

interface PredictionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  metrics: Metrics;
}

export function PredictionModal({
  open,
  onOpenChange,
  metrics,
}: PredictionModalProps) {
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState<{
    temperature: string;
    impact: number;
    recommendation: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generatePrediction = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const pollutionOffset = metrics.pollution * 0.01; // Scale pollution to years offset
      const predictedTemp = await trainAndPredict(pollutionOffset);

      const greenImpact = metrics.greenScore * 0.02;
      const netImpact = Number.parseFloat(predictedTemp) - 15.5 - greenImpact; // Compare to baseline

      setPrediction({
        temperature: predictedTemp,
        impact: netImpact,
        recommendation:
          netImpact > 3
            ? "Critical: Add more trees to reduce pollution!"
            : netImpact > 1
            ? "Warning: Consider adding green spaces."
            : "Good: Your city is relatively sustainable!",
      });
    } catch (err) {
      console.error("Prediction error:", err);
      setError("Unable to generate prediction. Using simplified model.");

      // Fallback to simple calculation
      const pollutionImpact = metrics.pollution * 0.05;
      const greenImpact = metrics.greenScore * 0.02;
      const netImpact = pollutionImpact - greenImpact;
      const baseTemp = 15.5;
      const predictedTemp = (baseTemp + netImpact).toFixed(2);

      setPrediction({
        temperature: predictedTemp,
        impact: netImpact,
        recommendation:
          netImpact > 3
            ? "Critical: Add more trees to reduce pollution!"
            : netImpact > 1
            ? "Warning: Consider adding green spaces."
            : "Good: Your city is relatively sustainable!",
      });
    } finally {
      setLoading(false);
    }
  }, [metrics]);

  useEffect(() => {
    if (open) {
      generatePrediction();
    }
  }, [open, generatePrediction]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            AI Climate Impact Prediction
          </DialogTitle>
          <DialogDescription>
            Based on your current city configuration and historical climate data
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="py-12 flex flex-col items-center justify-center gap-4">
            <FaSpinner className="w-8 h-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">
              Training AI model on climate data...
            </p>
          </div>
        ) : prediction ? (
          <div className="space-y-6 py-4">
            <div className="text-center">
              <div className="text-5xl font-bold text-primary mb-2">
                {prediction.temperature}°C
              </div>
              <p className="text-sm text-muted-foreground">
                Predicted temperature by 2030
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                <FaChartLine className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium mb-1">AI-Powered Analysis</p>
                  <p className="text-sm text-muted-foreground">
                    Using TensorFlow.js trained on historical temperature data
                    from New York, adjusted for your city&apos;s pollution level
                    of {metrics.pollution} units.
                  </p>
                </div>
              </div>

              <div
                className={`flex items-start gap-3 p-4 rounded-lg ${
                  prediction.impact > 3
                    ? "bg-red-500/10 border border-red-500/20"
                    : prediction.impact > 1
                    ? "bg-yellow-500/10 border border-yellow-500/20"
                    : "bg-green-500/10 border border-green-500/20"
                }`}
              >
                {prediction.impact > 1 ? (
                  <FaExclamationTriangle
                    className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                      prediction.impact > 3 ? "text-red-500" : "text-yellow-500"
                    }`}
                  />
                ) : (
                  <FaLeaf className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                )}
                <div>
                  <p className="font-medium mb-1">Recommendation</p>
                  <p className="text-sm text-muted-foreground">
                    {prediction.recommendation}
                  </p>
                </div>
              </div>

              {error && (
                <div className="text-xs text-yellow-500 text-center p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                  {error}
                </div>
              )}

              <div className="text-xs text-muted-foreground text-center p-3 bg-muted/30 rounded-lg">
                This prediction uses a linear regression model trained on real
                climate data, adjusted by your city&apos;s pollution and green
                space metrics.
              </div>
            </div>
          </div>
        ) : null}

        <Button onClick={() => onOpenChange(false)} className="w-full">
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );
}
