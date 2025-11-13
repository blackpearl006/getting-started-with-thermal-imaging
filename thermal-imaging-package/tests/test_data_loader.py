"""
Tests for data loading functionality.
"""

import pytest
from thermal_imaging.data.loader import DatasetLoader


def test_dataset_loader_initialization():
    """Test that DatasetLoader can be initialized."""
    loader = DatasetLoader(data_path="/path/to/data", dataset_type="dmr")
    assert loader.data_path == "/path/to/data"
    assert loader.dataset_type == "dmr"


def test_dataset_loader_metadata():
    """Test metadata retrieval."""
    loader = DatasetLoader(data_path="/path/to/data", dataset_type="dmr")
    metadata = loader.get_metadata()
    assert "dataset_type" in metadata
    assert "data_path" in metadata


def test_dataset_loader_load_not_implemented():
    """Test that load method raises NotImplementedError."""
    loader = DatasetLoader(data_path="/path/to/data")
    with pytest.raises(NotImplementedError):
        loader.load()
