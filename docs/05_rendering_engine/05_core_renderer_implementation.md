> 文档版本：v1.0  
> 负责人：Manus AI  
> 最后更新：2026-02-06  
> 状态：draft

# 5. 渲染引擎核心实现

本章提供 `RenderingEngine` 的核心 Python 实现代码。该实现基于 `python-pptx` 库，并严格遵循之前定义的规范。

## 5.1 核心类 `RenderingEngine`

```python
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.enum.chart import XL_CHART_TYPE
from pptx.chart.data import ChartData
from pptx.dml.color import RGBColor
import logging

# 配置日志
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class RenderingEngine:
    def __init__(self, template_path):
        self.template_path = template_path
        self.prs = Presentation(self.template_path)
        self.layout_map = self._map_layouts()

    def _map_layouts(self):
        """将母版中的版式名称映射到索引"""
        layout_map = {}
        for i, layout in enumerate(self.prs.slide_layouts):
            layout_map[layout.name] = i
        logger.info(f"Layout map created: {layout_map}")
        return layout_map

    def get_layout_index(self, layout_name):
        """通过逻辑名称获取版式索引"""
        # 这是逻辑名称到母版中实际名称的映射
        logical_to_physical_map = {
            'cover_page': 'Cover',
            'agenda_list': 'Agenda',
            'text_image_split': 'Content_Img_R', # 默认为右图左文
            'section_two_col': '2_Column',
            'section_four_grid': '4_Grid',
            'profile_card': 'Profile',
            'team_grid': 'Team_3', # 默认为3人
            'timeline': 'Timeline',
            'comparison_table': 'Comparison',
            'big_quote': 'Quote',
            'chart_data': 'Chart'
        }
        physical_name = logical_to_physical_map.get(layout_name)
        if not physical_name or physical_name not in self.layout_map:
            raise ValueError(f"Layout '{layout_name}' not found in template.")
        return self.layout_map[physical_name]

    def render_presentation(self, presentation_package, output_path):
        """渲染完整的演示文稿"""
        slides_data = presentation_package.get('slides', [])
        for slide_data in slides_data:
            try:
                self.render_slide(slide_data)
            except Exception as e:
                logger.error(f"Failed to render slide {slide_data.get('page_id')}: {e}")
        
        self.prs.save(output_path)
        logger.info(f"Presentation saved to {output_path}")

    def render_slide(self, slide_data):
        """渲染单个幻灯片"""
        layout_name = slide_data.get('layout_type')
        layout_index = self.get_layout_index(layout_name)
        slide_layout = self.prs.slide_layouts[layout_index]
        slide = self.prs.slides.add_slide(slide_layout)

        # 查找并调用对应的处理器
        handler_name = f"_handle_{layout_name}"
        handler = getattr(self, handler_name, self._handle_default)
        handler(slide, slide_data)

    # --- 通用辅助方法 ---
    def _fill_text(self, shape, text):
        """填充文本并处理溢出（简化版）"""
        if not text:
            return
        text_frame = shape.text_frame
        text_frame.text = text
        # 此处应加入更复杂的 Text Fitter 逻辑

    def _fill_image(self, shape, image_path):
        """填充图片并应用 Crop-to-Fill"""
        if not image_path:
            return
        # 此处应加入 Image Processor 的 Crop-to-Fill 逻辑
        try:
            placeholder.insert_picture(image_path)
        except Exception as e:
            logger.warning(f"Failed to insert image {image_path}: {e}")

    # --- 各版式处理器占位符 ---
    # 具体的实现将在后续文档中分文件详细说明

    def _handle_cover_page(self, slide, data):
        # 实现见 06_layout_handlers/01_cover_page_handler.md
        pass

    def _handle_agenda_list(self, slide, data):
        # 实现见 06_layout_handlers/02_agenda_list_handler.md
        pass

    def _handle_text_image_split(self, slide, data):
        # 实现见 06_layout_handlers/03_text_image_split_handler.md
        pass

    def _handle_section_two_col(self, slide, data):
        # 实现见 06_layout_handlers/04_section_two_col_handler.md
        pass

    def _handle_section_four_grid(self, slide, data):
        # 实现见 06_layout_handlers/05_section_four_grid_handler.md
        pass

    def _handle_profile_card(self, slide, data):
        # 实现见 06_layout_handlers/06_profile_card_handler.md
        pass

    def _handle_team_grid(self, slide, data):
        # 实现见 06_layout_handlers/07_team_grid_handler.md
        pass

    def _handle_timeline(self, slide, data):
        # 实现见 06_layout_handlers/08_timeline_handler.md
        pass

    def _handle_comparison_table(self, slide, data):
        # 实现见 06_layout_handlers/09_comparison_table_handler.md
        pass

    def _handle_big_quote(self, slide, data):
        # 实现见 06_layout_handlers/10_big_quote_handler.md
        pass

    def _handle_chart_data(self, slide, data):
        # 实现见 06_layout_handlers/11_chart_data_handler.md
        pass

    def _handle_default(self, slide, data):
        """默认处理器，用于未实现或未知的版式"""
        logger.warning(f"No specific handler for layout '{data.get('layout_type')}'. Using default.")
        # 尝试填充通用的 title 和 content 占位符
        try:
            title_shape = slide.shapes.title
            if title_shape:
                self._fill_text(title_shape, data.get('title'))
        except Exception:
            pass

# --- 使用示例 ---
if __name__ == '__main__':
    # 假设 final_package.json 是一个符合协议的字典
    import json
    with open('final_package.json', 'r', encoding='utf-8') as f:
        package = json.load(f)

    engine = RenderingEngine(template_path='path/to/your/template.pptx')
    engine.render_presentation(
        presentation_package=package,
        output_path='output.pptx'
    )
```

## 5.2 设计说明

- **动态分发**: `render_slide` 方法通过 `getattr` 实现了处理逻辑的动态分发。这种设计使得为新的版式添加处理器变得非常简单，只需在类中新增一个 `_handle_<layout_name>` 方法即可，无需修改主逻辑。
- **版式映射**: `_map_layouts` 和 `get_layout_index` 方法解耦了数据协议中的逻辑版式名称和 `python-pptx` 依赖的物理版式索引/名称，增强了系统的灵活性。
- **健壮性**: 主渲染循环中包含了 `try...except` 块，确保单个幻灯片的渲染失败不会导致整个演示文稿的生成过程崩溃。
- **模块化**: 具体的版式处理逻辑被分离到各自的方法中，这使得代码更易于阅读、测试和维护。详细的实现将在后续的 `06_layout_handlers` 目录中逐一展示。
