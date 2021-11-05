from fastapi import APIRouter, Depends, HTTPException, status
from schemas import user
from models import models
from sqlalchemy.orm import Session
from database.database import get_db
from core import oauth2, hashing

router = APIRouter(
    prefix='/user',
    tags=['Users']
)

@router.post('/')
async def create_user(request: user.User,db: Session = Depends(get_db)):
    old_user = db.query(models.User).filter(models.User.username == request.username).first()
    if old_user:
        raise HTTPException(status_code=status.HTTP_405_METHOD_NOT_ALLOWED, detail=f"User: {request.username} already exists")

    new_user = models.User(
        name = request.name,
        username = request.username,
        password = hashing.Hash.bcrypt(request.password)
    )
    try:
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return {"detail": f'User: {request.username} created'}
    except:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT)


@router.get('/me', response_model=user.Show_User)
async def show_me(current_user: user = Depends(oauth2.get_current_user)):
    return current_user

@router.post('/admin')
async def create_admin(request: user.User,db: Session = Depends(get_db)):
    old_user = db.query(models.User).filter(models.User.username == request.username).first()
    if old_user:
        raise HTTPException(status_code=status.HTTP_405_METHOD_NOT_ALLOWED, detail=f"User: {request.username} already exists")

    new_user = models.User(
        name = request.name,
        username = request.username,
        password = hashing.Hash.bcrypt(request.password),
        is_superuser = True
    )
    try:
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return new_user
    except:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT)