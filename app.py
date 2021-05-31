from os import name
from flask import Flask, redirect, url_for, render_template, request
import requests
import random
from firebase_admin import firestore
from firebase_admin import credentials
import firebase_admin
cred = credentials.Certificate("sample.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

# from os import name
app = Flask(__name__)


@app.route('/')
def home():
    return render_template('index.html')


@app.route('/news')
def news():
    return render_template('news.html')


@app.route('/vaccination')
def vaccination():
    return render_template('vaccination.html')


@app.route('/tracker')
def tracker():
    return render_template('tracker.html')


@app.route('/medicine')
def medicine():
    return render_template('medicine.html')


@app.route('/register', methods=["POST", "GET"])
def register():

    if request.method == "POST":
        global full_name
        global company_name
        global medicines
        global immunity_boosters
        global other_med
        global address
        global district
        global mobile
        full_name = request.form["full_name"]
        company_name = request.form["company_name"]
        medicines = request.form.getlist('medicines')
        immunity_boosters = request.form.getlist('immunity-boosters')
        other_med = request.form["other_med"]
        address = request.form["address"]
        district = request.form["district"]
        mobile = request.form["mobile"]
        print(full_name)
        print(company_name)
        print(medicines, type(medicines))
        print(immunity_boosters, type(immunity_boosters))
        print(other_med)
        print(address)
        print(district)
        print(mobile)

        # send otp to the phone number (done)
        global a
        a = random.randint(100000, 999999)
        print(a)

        # url = "https://www.fast2sms.com/dev/bulkV2"

        # querystring = {"authorization": "KhTFnWoHcZYBNQU6euCPbsgt0xmlA4Swfr9VI58GDad72jy3qMDdXbCvo5IlVsh1i32WAqaGu8BgE0tc",
        #                "sender_id": "TXTIND", "message": f"Hello, Welcome to Covid Portal. Your OTP for creating a seller account is {a}. Do not share it with any one.", "route": "v3", "numbers": f"{mobile}"}

        # headers = {
        #     'cache-control': "no-cache"
        # }

        # response = requests.request(
        #     "GET", url, headers=headers, params=querystring)

        # print(response.text)

        # redirecting to otp page to enter OTP

        return render_template('verifyotp.html')

    else:
        return render_template('register.html')


@app.route('/verify', methods=["POST", "GET"])
def verify():
    if request.method == "POST":

        otp = request.form["otp"]
        otp = int(otp)

        if(a == otp):
            print("otp is correct")
            # add form values to the firebase now
            db.collection(f'{district}').add(
                {
                    'name': full_name,
                    'company_name': company_name,
                    'medicines': medicines,
                    'immunity_boosters': immunity_boosters,
                    'other_med': other_med,
                    'address': address,
                    'district': district,
                    'mobile': mobile
                }
            )
            flag = 1
            # flash message that your seller account is created
        else:
            print("otp is incorrect")
            # show message that otp is incorrect
            # dont add data to the firebase
            flag = 0
        return render_template('verifyotp.html', success=flag)

    else:
        return render_template('verifyotp.html')


@app.route('/buy', methods=["GET", "POST"])
def buy():
    if request.method == "POST":
        # when  buyer fills the medicine form
        # store form data in global varaibles
        # read data from firestore
        # show relevant data on new page
        global buyer_name
        global buyer_medicines
        global buyer_immunity_boosters
        global buyer_other_medicine
        global buyer_district
        buyer_name = request.form["buyer_name"]
        buyer_medicines = request.form.getlist('buyer_medicines')
        buyer_immunity_boosters = request.form.getlist(
            'buyer_immunity_boosters')
        buyer_other_medicine = request.form["buyer_other_medicine"]
        buyer_district = request.form["buyer_district"]

        print(buyer_name)
        print(buyer_medicines)
        print(buyer_immunity_boosters)
        print(buyer_other_medicine)
        print(buyer_district)

        docs = db.collection(f'{buyer_district}').where(
            "medicines", "array_contains", "Tocilizumab").get()
        for doc in docs:
            print(doc.to_dict())
        return render_template('buy.html')

    else:
        return render_template('buy.html')


if __name__ == "__main__":
    app.run(debug=True)
