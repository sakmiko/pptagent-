> 文档版本：v1.0  
> 负责人：Manus AI  
> 最后更新：2026-02-06  
> 状态：stable

# 斑点背景生成器 (`SpotBackgroundGenerator`)

## 1. 概述

本生成器负责创建具有高级质感的斑点背景。它通过在画布上随机散布不同大小、颜色和透明度的圆形斑点，模拟出类似水墨或喷溅的艺术效果。

## 2. 实现代码

```python
import random
import numpy as np
from PIL import Image, ImageDraw
from .core_components import BackgroundGenerator, ThemeConfig

class SpotBackgroundGenerator(BackgroundGenerator):
    """
    生成具有高级质感的斑点背景。
    """

    def generate(self, width: int, height: int, config: ThemeConfig) -> Image.Image:
        """
        在画布上随机散布不同大小、颜色和透明度的圆形斑点。
        """
        # 1. 创建基础画布
        image = Image.new("RGB", (width, height), config.background_color)
        draw = ImageDraw.Draw(image, "RGBA")

        # 2. 定义斑点参数
        num_spots = int(width * height * 0.0001) # 斑点数量与面积成正比
        colors = [config.primary_color, config.secondary_color]

        # 3. 循环生成斑点
        for _ in range(num_spots):
            # 随机选择颜色，并添加透明度
            base_color = random.choice(colors)
            alpha = random.randint(50, 150) # 随机透明度
            spot_color = base_color + (alpha,)

            # 随机位置和大小
            x = random.randint(-int(width*0.1), int(width*1.1))
            y = random.randint(-int(height*0.1), int(height*1.1))
            radius = random.randint(int(min(width, height)*0.05), int(min(width, height)*0.2))

            # 绘制圆形斑点
            draw.ellipse(
                (x - radius, y - radius, x + radius, y + radius),
                fill=spot_color
            )

        # 4. （可选）应用高斯模糊以增强质感
        # from PIL import ImageFilter
        # image = image.filter(ImageFilter.GaussianBlur(radius=5))

        return image

# 示例用法
if __name__ == '__main__':
    spot_gen = SpotBackgroundGenerator()
    theme = ThemeConfig()
    background_image = spot_gen.generate(1920, 1080, theme)
    spot_gen.save(background_image, "spot_background.png")
```

## 3. 可调参数与效果

- **`num_spots`**: 增加此值会使斑点更密集。
- **`alpha` (透明度)**: 调整 `random.randint(50, 150)` 的范围可以改变斑点的通透感。较低的值会产生更柔和的效果。
- **`radius` (半径)**: 调整半径范围可以改变斑点的大小。更大的半径会产生更大块的色斑。
- **高斯模糊**: 取消代码中高斯模糊部分的注释，可以使斑点边缘更柔和，产生类似水彩画的融合效果。
