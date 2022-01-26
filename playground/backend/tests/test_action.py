import requests
import json
from tools.utils import *

SRC_FOLDER = "./tests/resources"
BASE_URL = "http://localhost:3001"

def test_retrieve_all_actions():
    """Test to retrieve every action."""
    # get expected output from file
    resp = get_req_assertion(f'{BASE_URL}/action')
    assert len(resp) > 0

def test_get_specific_action():
    """Test to retrieve action with ID: 1"""
    
    resp = get_req_assertion(f'{BASE_URL}/action/1')
    assert resp["id"] == 1
    
def test_action_not_found():
    """Test retrieving an action that does not exist"""
    
    expected = {"message":"Didn't find action 999999999."}
    _ = get_req_assertion(f'{BASE_URL}/action/999999999', status_code=404, expected=expected)
    
def test_create_action():
    """Test creating an action."""
    payload={
        "description":"This is a test action.",
        "employeeId":"Test User"
    }
    resp = post_req_assertion(f'{BASE_URL}/action', payload=payload)
    assert resp["description"] == payload["description"]
    assert resp["employeeId"] == payload["employeeId"]
    
def test_delete_action():
    """Test deleting a action"""   
    _resp = delete_req_assertion(f'{BASE_URL}/action/2', expected={'message': 'Success.'})
    
def test_delete_all_actions():
    """Test delete all actions"""
    _resp = delete_req_assertion(f'{BASE_URL}/action', expected={'message': 'Success.'})
    
    
if __name__ == "__main__":
    test_retrieve_all_actions()
    test_get_specific_action()
    test_action_not_found()
    test_create_action()
    test_delete_action()
    test_delete_all_actions()