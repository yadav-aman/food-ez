from sqlalchemy import create_engine, engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

SQLALCHEMY_DB_URL = 'sqlite:///./foodez.db'

engine = create_engine(SQLALCHEMY_DB_URL, connect_args={"check_same_thread": False})

LocalSession = sessionmaker(bind=engine, autocommit=False, autoflush=False)

Base = declarative_base()

def get_db():
    db = LocalSession()
    try:
        yield db
    finally:
        db.close()
