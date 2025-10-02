# Terra Models Structure

## Components Overview

### 1. InteractiveTerra.tsx

- **الاستخدام**: HeroSection
- **الوظيفة**: Terra تفاعلي مع controls
- **المميزات**:
  - OrbitControls مفعلة (zoom, rotate)
  - AutoRotate مفعل
  - Controls للمستخدم

### 2. AnimatedTerra.tsx

- **الاستخدام**: EarthSection
- **الوظيفة**: Terra مبرمج بدون تحكم المستخدم
- **المميزات**:
  - لا توجد OrbitControls
  - دوران مبرمج حسب scroll
  - حركة مبرمجة بالـ CSS transforms

### 3. TerraModel.tsx (قديم)

- **الحالة**: متروك للتوافق مع أي imports قديمة
- **يُفضل عدم استخدامه**: استخدم المكونين الجديدين بدلاً منه

## الفوائد:

1. **لا توجد تضارب** بين الـ Canvas instances
2. **تحكم منفصل** في كل مكون
3. **أداء أفضل** - كل مكون محسن لاستخدامه
4. **صيانة أسهل** - كل مكون له مسؤولية واحدة
