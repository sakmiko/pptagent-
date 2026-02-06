> 文档版本：v1.0  
> 负责人：Manus AI  
> 最后更新：2026-02-06  
> 状态：stable

# 预设背景库

## 1. 概述

为了方便用户快速选用高质量的背景设计，我们建立了一个预设背景库。每个预设都是一组精心调校过的参数，对应一种特定的视觉风格。用户只需选择一个预设名称，系统即可自动生成对应的背景。

## 2. 预设数据结构

每个预设由一个 Pydantic 模型 `Preset` 定义，包含以下字段：

- `name`: 预设的唯一名称 (e.g., "ocean_breeze")。
- `description`: 对该预设风格的简要描述。
- `generator_type`: 使用的生成器类型 (e.g., "gradient", "spot")。
- `theme_config`: 该预设使用的主题颜色配置。
- `generator_params`: 传递给具体生成器的额外参数 (e.g., `angle` for gradient)。

### 代码实现

```python
from pydantic import BaseModel, Field
from typing import Dict, Any
from ..core_generators.core_components import ThemeConfig

class Preset(BaseModel):
    """
    定义一个背景设计预设。
    """
    name: str
    description: str
    generator_type: str
    theme_config: ThemeConfig
    generator_params: Dict[str, Any] = Field(default_factory=dict)

```

## 3. 预设库管理器

`PresetLibrary` 类负责加载、管理和访问所有的预设。它从一个集中的配置文件（如 JSON 或 Python 字典）中加载所有预设，并提供一个简单的方法来按名称获取预设。

### 代码实现

```python
import json
from typing import Dict, Optional

# 假设生成器类已经导入
from ..core_generators.spot_generator import SpotBackgroundGenerator
from ..core_generators.gradient_generator import GradientBackgroundGenerator
from ..core_generators.geometric_generator import GeometricBackgroundGenerator

class PresetLibrary:
    """
    管理和访问所有背景设计预设。
    """
    def __init__(self, presets_data: Dict[str, Dict]):
        self._presets = {
            name: Preset(**data)
            for name, data in presets_data.items()
        }
        self._generators = {
            "spot": SpotBackgroundGenerator(),
            "gradient": GradientBackgroundGenerator(),
            "geometric": GeometricBackgroundGenerator(),
        }

    def get_preset(self, name: str) -> Optional[Preset]:
        return self._presets.get(name)

    def generate_background_from_preset(self, name: str, width: int, height: int):
        """
        根据预设名称生成背景图片。
        """
        preset = self.get_preset(name)
        if not preset:
            print(f"错误：未找到名为 '{name}' 的预设。")
            return None

        generator = self._generators.get(preset.generator_type)
        if not generator:
            print(f"错误：未找到类型为 '{preset.generator_type}' 的生成器。")
            return None

        print(f"正在使用预设 '{name}' 生成背景...")
        return generator.generate(
            width, 
            height, 
            preset.theme_config, 
            **preset.generator_params
        )

```

## 4. 预设配置文件示例

这是一个 Python 字典格式的预设配置文件。在实际项目中，可以将其保存为 JSON 文件以便于管理。

```python
PRESET_DATA = {
    "deep_ocean": {
        "name": "deep_ocean",
        "description": "深邃的海洋渐变，适合商务和科技主题。",
        "generator_type": "gradient",
        "theme_config": {
            "primary_color": (23, 37, 84), # 深蓝
            "background_color": (17, 24, 39) # 近黑
        },
        "generator_params": {"angle": 135}
    },
    "sunset_glow": {
        "name": "sunset_glow",
        "description": "温暖的日落光辉渐变，适合创意和温馨主题。",
        "generator_type": "gradient",
        "theme_config": {
            "primary_color": (251, 146, 60), # 橙色
            "secondary_color": (239, 68, 68), # 红色
            "background_color": (120, 50, 80) # 紫色
        },
        "generator_params": {"angle": 90}
    },
    "ink_splash": {
        "name": "ink_splash",
        "description": "优雅的水墨斑点，适合艺术和高端主题。",
        "generator_type": "spot",
        "theme_config": {
            "primary_color": (17, 24, 39), # 墨黑
            "secondary_color": (107, 114, 128), # 灰色
            "background_color": (248, 249, 250)
        }
    },
    "tech_grid": {
        "name": "tech_grid",
        "description": "现代科技感的几何网格，适合数据和未来主题。",
        "generator_type": "geometric",
        "theme_config": {
            "primary_color": (59, 130, 246), # 蓝色
            "secondary_color": (34, 211, 238), # 青色
            "background_color": (17, 24, 39)
        }
    }
}

# 示例用法
if __name__ == '__main__':
    library = PresetLibrary(PRESET_DATA)
    
    # 生成深海渐变背景
    deep_ocean_img = library.generate_background_from_preset("deep_ocean", 1920, 1080)
    if deep_ocean_img:
        deep_ocean_img.save("preset_deep_ocean.png")

    # 生成水墨斑点背景
    ink_splash_img = library.generate_background_from_preset("ink_splash", 1920, 1080)
    if ink_splash_img:
        ink_splash_img.save("preset_ink_splash.png")
```
