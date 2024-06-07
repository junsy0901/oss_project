from fastapi import FastAPI
from guest import guest_router    
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

app = FastAPI()

origins = ["http://127.0.0.1:8000",  "http://127.0.0.1:5501", "http://3.211.6.129"] # frontend 접속 주소를 지정해야 접근할 수 있음
app.add_middleware( 
    CORSMiddleware, 
    allow_origins=origins, 
    allow_credentials=True, 
    allow_methods=["*"], 
    allow_headers=["*"], 
)

@app.get("/")
async def welcome() -> dict:
    return {
        "msg" : "hello world!"
    }

app.include_router(guest_router)

if __name__ == '__main__':
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
