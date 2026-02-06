> 文档版本：v1.0  
> 负责人：Manus AI  
> 最后更新：2026-02-06  
> 状态：stable

# 几何图案背景生成器 (`GeometricBackgroundGenerator`)

## 1. 概述

本生成器负责创建由重复的几何图案（如三角形、六边形）组成的背景。这种背景具有强烈的现代感和科技感，常用于技术、数据或设计相关的演示文稿。

## 2. 实现代码

```python
import random
import numpy as np
from PIL import Image, ImageDraw
from .core_components import BackgroundGenerator, ThemeConfig

class GeometricBackgroundGenerator(BackgroundGenerator):
    """
    生成由重复的几何图案（三角形）组成的背景。
    """

    def generate(self, width: int, height: int, config: ThemeConfig) -> Image.Image:
        """
        使用 Delaunay 三角剖分算法创建几何网格背景。
        """
        try:
            from scipy.spatial import Delaunay
        except ImportError:
            print("Scipy is required for GeometricBackgroundGenerator. Please install it: pip install scipy")
            return Image.new("RGB", (width, height), config.background_color)

        # 1. 创建基础画布
        image = Image.new("RGB", (width, height), config.background_color)
        draw = ImageDraw.Draw(image, "RGBA")

        # 2. 生成随机点
        num_points = 50
        points = np.random.rand(num_points, 2) * np.array([width, height])

        # 3. 执行 Delaunay 三角剖分
        tri = Delaunay(points)

        # 4. 绘制每个三角形
        for simplex in tri.simplices:
            p1 = tuple(points[simplex[0]])
            p2 = tuple(points[simplex[1]])
            p3 = tuple(points[simplex[2]])

            # 随机选择主色或辅助色，并赋予随机透明度
            base_color = random.choice([config.primary_color, config.secondary_color])
            alpha = random.randint(20, 80)
            fill_color = base_color + (alpha,)

            draw.polygon([p1, p2, p3], fill=fill_color)

        return image

# 示例用法
if __name__ == '__main__':
    # 需要先安装 scipy: pip install scipy
    try:
        geometric_gen = GeometricBackgroundGenerator()
        theme = ThemeConfig()
        background_image = geometric_gen.generate(1920, 1080, theme)
        geometric_gen.save(background_image, "geometric_background.png")
    except ImportError as e:
        print(e)

```

## 3. 依赖项

本生成器依赖于 `scipy` 库来进行 Delaunay 三角剖分。如果环境中没有安装，需要通过以下命令安装：

```bash
sudo pip3 install scipy
```

## 4. 可调参数与效果

- **`num_points`**: 控制随机点的数量。点越多，生成的三角形越小、越密集。
- **`alpha` (透明度)**: 调整 `random.randint(20, 80)` 的范围可以改变三角形的透明度。较低的值会使背景看起来更 subtle（微妙）。
- **颜色选择**: `random.choice([config.primary_color, config.secondary_color])` 决定了每个三角形的颜色。可以修改这个列表来引入更多颜色或只使用一种颜色。
