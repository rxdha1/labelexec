import json
import os
from create_yaml_data import create_yaml, create_data
from create_campaign_registry_data import create_campaign_registry_data

create_yaml("get_free_fans", "The answer should be numerically correct and include appropriate units (if applicable). The solution should match exactly with the reference answer.")

registry_data = create_campaign_registry_data("free_fans_count", "How many fans have a free Spotify account??")

create_data('get_free_fans', registry_data)