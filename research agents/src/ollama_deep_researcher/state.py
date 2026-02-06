"""State definitions for the research assistant graph."""

import operator
from dataclasses import dataclass, field

from typing_extensions import Annotated


@dataclass(kw_only=True)
class SummaryState:
    """State for the research assistant graph.

    Attributes:
        research_topic: The topic to research.
        search_query: The current search query.
        web_research_results: List of web research results.
        sources_gathered: List of sources gathered.
        research_loop_count: Number of research loops completed.
        running_summary: The running summary of the research.
    """

    research_topic: str = field(default=None)  # Report topic
    search_query: str = field(default=None)  # Search query
    web_research_results: Annotated[list, operator.add] = field(default_factory=list)
    sources_gathered: Annotated[list, operator.add] = field(default_factory=list)
    research_loop_count: int = field(default=0)  # Research loop count
    running_summary: str = field(default=None)  # Final report


@dataclass(kw_only=True)
class SummaryStateInput:
    """Input state for the research assistant graph.

    Attributes:
        research_topic: The topic to research.
    """

    research_topic: str = field(default=None)  # Report topic


@dataclass(kw_only=True)
class SummaryStateOutput:
    """Output state for the research assistant graph.

    Attributes:
        running_summary: The final research summary.
    """

    running_summary: str = field(default=None)  # Final report
