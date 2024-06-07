from pydantic import BaseModel

class Guest(BaseModel):
    id: int
    name: str
    text: str
    date: str  # 날짜 필드 추가
    time: str  # 시간 필드 추가
