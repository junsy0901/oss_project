from fastapi import APIRouter, Path
from model import Guest

guest_router = APIRouter()

guest_list = []
guest_counter = 0

@guest_router.post("/guest")
async def add_guest(guest: Guest) -> dict:
    global guest_counter
    guest.id = guest_counter = guest_counter+1
    guest_list.append(guest)
    return {
        "msg" : "Guest added successfully"
    }

@guest_router.get("/guest")
async def retrieve_guests() -> dict:
    return {
        "guests": guest_list
    }

@guest_router.get("/guest/{guest_id}")
async def get_single_guest(guest_id: int = Path(..., title="the Id of the guest to retrive")) -> dict:
    for guest in guest_list:
        if guest.id == guest_id:
            return { "guest": guest}
        return {"msg":"Guest with supplied Id doesn't exist"}
    
@guest_router.delete("/guest/{guest_id}") 
async def delete_guest(guest_id: int = Path(..., title="the ID of the guest to delete")) -> dict: 
    for index, guest in enumerate(guest_list): 
        if guest.id == guest_id: 
            del guest_list[index] 
            return {"msg": f"Guest with ID {guest_id} deleted successfully"} 
    return {"msg": "Guest with supplied ID doesn't exist"}
