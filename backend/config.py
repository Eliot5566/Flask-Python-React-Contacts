
#config
from flask import Flask

from flask_sqlalchemy import SQLAlchemy


from flask_cors import CORS


# 初始化flask
app = Flask(__name__)

CORS(app)




# 數據庫配置
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///mydatabase.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False # 不追踪對象的修改

# 初始化數據庫

db = SQLAlchemy(app)