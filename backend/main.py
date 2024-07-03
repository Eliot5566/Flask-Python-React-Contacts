#main.py
from flask import request, jsonify
from config import app, db

from models import Contact



@app.route("/contacts", methods = ["GET"])

@app.route("/create_contact", methods = ["POST"])
def create_contact():
    first_name = request.json.get("firstName")
    last_name = request.json.get("lastName")
    email = request.json.get("email")

    if not first_name or not last_name or not email:
        return (jsonify({"message" : "請提供所有必要信息"}), 400)
    

    new_contact = Contact(first_name = first_name, last_name = last_name, email = email)

    try:
        db.session.add(new_contact)
        db.session.commit()
    except Exception as e:
        return (jsonify({"message" : str(e)}), 400)
    
    return (jsonify({"message" : "聯繫人創建成功"}), 201) # 201表示創建成功


@app.route("/update_contact/<int:id>", methods = ["PATCH"]) #PATCH用於更新部分資源 PUT用於更新全部資源 差別在於是否需要傳遞所有參數
def update_contact(user_id):
    contact = Contact.query.get(user_id)

    if not contact:
        return (jsonify({"message" : "聯繫人不存在"}), 400)
    
    data = request.json

    contact.first_name = data.get("firstName", contact.first_name) # 如果data中有firstName則更新 否則保持原值
    contact.last_name = data.get("lastName", contact.last_name)
    contact.email = data.get("email", contact.email)

    db.session.commit()

    return (jsonify({"message" : "聯繫人更新成功"}), 200)


@app.route("/delete_contact/<int:id>", methods = ["DELETE"])
def delete_contact(id):
    contact = Contact.query.get(id)

    if not contact:
        return (jsonify({"message" : "聯繫人不存在"}), 400)
    
    db.session.delete(contact)
    db.session.commit()

    return (jsonify({"message" : "聯繫人刪除成功"}), 200)



def get_contacts():
    contacts = Contact.query.all() 

    # 將對象列表轉換為json列表
    json_contacts = list(map(lambda contact: contact.to_json(), contacts))

    # 返回json數據 jsonify用於將字典轉換為json對象 字典內放入json_contacts 進行轉換 
    return jsonify({"contacts" : json_contacts})

# 判斷 當前是否是主程序
if __name__ == "__main__":

    # 創建數據庫表  app.app_context() 進入應用上下文 進行數據庫操作
    with app.app_context():
        db.create_all()

    app.run(debug = True)








#下方可執行

# from flask import Flask, request, jsonify
# from flask_sqlalchemy import SQLAlchemy
# from flask_cors import CORS

# # Initialize Flask
# app = Flask(__name__)
# CORS(app)

# # Database Configuration
# app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///mydatabase.db"
# app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
# db = SQLAlchemy(app)

# # Model definition
# class Contact(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     first_name = db.Column(db.String(80), nullable=False)
#     last_name = db.Column(db.String(80), nullable=False)
#     email = db.Column(db.String(100), unique=True, nullable=False)

#     def to_json(self):
#         return {
#             "id": self.id,
#             "firstName": self.first_name,
#             "lastName": self.last_name,
#             "email": self.email,
#         }

# # Get all contacts
# @app.route("/contacts", methods=["GET"])
# def get_contacts():
#     contacts = Contact.query.all()
#     json_contacts = [contact.to_json() for contact in contacts]
#     return jsonify({"contacts": json_contacts})

# # Create a contact
# @app.route("/create_contact", methods=["POST"])
# def create_contact():
#     data = request.get_json()
#     first_name = data.get("firstName")
#     last_name = data.get("lastName")
#     email = data.get("email")

#     if not first_name or not last_name or not email:
#         return jsonify({"message": "Please provide all required information"}), 400

#     new_contact = Contact(first_name=first_name, last_name=last_name, email=email)
#     try:
#         db.session.add(new_contact)
#         db.session.commit()
#     except Exception as e:
#         return jsonify({"message": str(e)}), 400

#     return jsonify({"message": "Contact created successfully"}), 201

# # Update a contact
# @app.route("/update_contact/<int:id>", methods=["PATCH"])
# def update_contact(id):
#     contact = Contact.query.get(id)
#     if not contact:
#         return jsonify({"message": "Contact not found"}), 404

#     data = request.get_json()
#     contact.first_name = data.get("firstName", contact.first_name)
#     contact.last_name = data.get("lastName", contact.last_name)
#     contact.email = data.get("email", contact.email)

#     db.session.commit()
#     return jsonify({"message": "Contact updated successfully"}), 200

# # Delete a contact
# @app.route("/delete_contact/<int:id>", methods=["DELETE"])
# def delete_contact(id):
#     contact = Contact.query.get(id)
#     if not contact:
#         return jsonify({"message": "Contact not found"}), 404

#     db.session.delete(contact)
#     db.session.commit()
#     return jsonify({"message": "Contact deleted successfully"}), 200

# # Main function to run the app
# if __name__ == "__main__":
#     with app.app_context():
#         db.create_all()
#     app.run(debug=True)
