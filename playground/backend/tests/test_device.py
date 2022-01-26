import requests
import json
from tools.utils import *

SRC_FOLDER = "./tests/resources"
BASE_URL = "http://localhost:3001"

def test_retrieve_all_devices():
    """Test to retrieve every device."""
    # get expected output from file
    resp = get_req_assertion(f'{BASE_URL}/device')
    assert len(resp) > 0

def test_get_specific_device():
    """Test to retrieve device with ID: 470AD"""
    
    resp = get_req_assertion(f'{BASE_URL}/device/470AD')
    assert resp["id"] == "470AD"
    
def test_device_not_found():
    """Test retrieving a device that does not exist"""
    
    expected = {"message":"Didn't find device not_real_device_id."}
    _ = get_req_assertion(f'{BASE_URL}/device/not_real_device_id', status_code=404, expected=expected)
    
def test_create_device():
    """Test creating a device."""
    resp = post_req_assertion(f'{BASE_URL}/device', payload={"id":"470H"})
    assert resp["id"] == "470H"
    
def test_delete_device():
    """Test deleting a device"""   
    _resp = delete_req_assertion(f'{BASE_URL}/device/470H', expected={'message': 'Success.'})
    
def test_delete_all_devices():
    """Test delete all devices"""
    _resp = delete_req_assertion(f'{BASE_URL}/device', expected={'message': 'Success.'})
    
    
if __name__ == "__main__":
    test_retrieve_all_devices()
    test_get_specific_device()
    test_device_not_found()
    test_create_device()
    test_delete_device()
    test_delete_all_devices()