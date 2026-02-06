> 文档版本：v1.0  
> 负责人：Manus AI  
> 最后更新：2026-02-06  
> 状态：stable

# 渐变背景生成器 (`GradientBackgroundGenerator`)

## 1. 概述

本生成器负责创建平滑的线性渐变背景。它支持从任意角度生成两种或多种颜色的渐变，是商务和通用演示文稿中最常用的背景类型。

## 2. 实现代码

```python
import numpy as np
from PIL import Image
from .core_components import BackgroundGenerator, ThemeConfig

class GradientBackgroundGenerator(BackgroundGenerator):
    """
    生成平滑的线性渐变背景。
    """

    def generate(self, width: int, height: int, config: ThemeConfig, angle: float = 45.0) -> Image.Image:
        """
        根据指定角度生成从主色到背景色的线性渐变。

        Args:
            width: 图片宽度。
            height: 图片高度。
            config: 主题配置。
            angle: 渐变角度 (0-360度)。
        """
        # 1. 将角度转换为弧度
        rad = np.deg2rad(angle)

        # 2. 创建一个网格，表示每个像素的坐标
        x = np.linspace(-1, 1, width)
        y = np.linspace(-1, 1, height)
        xv, yv = np.meshgrid(x, y)

        # 3. 计算每个点在渐变方向上的投影
        # 这是实现渐变的核心数学步骤
        gradient = (np.cos(rad) * xv + np.sin(rad) * yv)
        
        # 4. 归一化到 0-1 范围
        gradient = (gradient - gradient.min()) / (gradient.max() - gradient.min())

        # 5. 在两种颜色之间进行线性插值
        start_color = np.array(config.primary_color)
        end_color = np.array(config.background_color)

        # 使用 NumPy 的广播机制高效计算每个像素的颜色
        r = start_color[0] * (1 - gradient) + end_color[0] * gradient
        g = start_color[1] * (1 - gradient) + end_color[1] * gradient
        b = start_color[2] * (1 - gradient) + end_color[2] * gradient

        # 6. 将颜色数据堆叠并转换为 PIL Image
        rgb_array = np.stack([r, g, b], axis=-1).astype(np.uint8)
        image = Image.fromarray(rgb_array, "RGB")

        return image

# 示例用法
if __name__ == '__main__':
    gradient_gen = GradientBackgroundGenerator()
    theme = ThemeConfig()
    # 生成一个 45 度的渐变背景
    background_image = gradient_gen.generate(1920, 1080, theme, angle=45)
    gradient_gen.save(background_image, "gradient_background_45deg.png")

    # 生成一个 120 度的渐变背景
    background_image_120 = gradient_gen.generate(1920, 1080, theme, angle=120)
    gradient_gen.save(background_image_120, "gradient_background_120deg.png")
```

## 3. 可调参数与效果

- **`angle`**: 这是最重要的参数，控制渐变的方向。
    - `0` 度: 从左到右渐变。
    - `90` 度: 从上到下渐变。
    - `45` 度: 从左上到右下渐变。
- **`config.primary_color`**: 渐变的起始颜色。
- **`config.background_color`**: 渐变的结束颜色。可以替换为 `config.secondary_color` 来创建主色到辅助色的渐变。
