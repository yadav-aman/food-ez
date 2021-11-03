from fastapi import status, HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer
from routers.jwtToken import verify_token
from database.database import get_db
from sqlalchemy.orm import Session
from models import models


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

async def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db),):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    token_data = verify_token(token, credentials_exception)
    user = db.query(models.User).filter(models.User.username == token_data.username).first()
    if not user:
        raise credentials_exception
    return user