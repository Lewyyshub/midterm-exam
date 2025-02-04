import "./cards.css";
import ovals from "../../../images/ovals.png";
import lines from "../../../images/lines.png";
import mark from "../../../images/mark.png";
import { useState } from "react";
function CardInfo() {
  const [isVisible, setIsVisible] = useState(true);
  const [isValid, setIsValid] = useState(true);
  const [cardHolder, setCardholder] = useState("");
  const [cardMonth, setCardmonth] = useState("");
  const [cardYear, setCardyear] = useState("");
  const [appriciate, setAppriciate] = useState(false);

  const [error, setError] = useState("");
  const validateName = (value) => {
    const NameValidation = /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/;
    if (!NameValidation.test(value)) {
      setError("Wrong format, use only real name");
      return false;
    } else {
      setError("");
      return true;
    }
  };

  const [cardError, setCardError] = useState("");
  const [cardNumber, setCardnumber] = useState("");
  const ValidateCardNumber = (value) => {
    const CardNumberValidation = /^4[0-9]{12}(?:[0-9]{3})?$/;
    if (!CardNumberValidation.test(value)) {
      setCardError("Wrong format, numbers only");
      return false;
    } else {
      setCardError("");
      return true;
    }
  };

  const [cvcError, setCvcError] = useState("");
  const [cvc, setCvc] = useState("");
  const ValidateCvc = (value) => {
    const cvcValidation = /^[0-9]{3,4}$/;
    if (!cvcValidation.test(value)) {
      setCvcError("Can’t be blank");
      return false;
    } else setCvcError("");
    return true;
  };

  const handleCardholder = (e) => {
    const value = e.target.value;
    setCardholder(value);

    const isNameValid = validateName(value);
    setIsValid(isNameValid);
  };

  const handleCardnumber = (e) => {
    const value = e.target.value;
    setCardnumber(value);
    ValidateCardNumber(value);
  };
  const handleCardmonth = (e) => {
    const value = e.target.value;
    if (value.length <= 2) {
      setCardmonth(value);
      //ამას ვალიდაცია ვერ დავადე//
    }
  };
  const handleCardYear = (e) => {
    const value = e.target.value;
    if (value.length <= 2) {
      setCardyear(value);
      //ამას ვალიდაცია ვერ დავადე//
    }
  };
  const handleCvc = (e) => {
    const value = e.target.value;
    setCvc(value);
    ValidateCvc(value);
  };
  const MainPage = (e) => {
    // e.preventDefault("");
    //აქ ქონთინიუს კლიკზე მინდოდა გასუფთავებულიყო მარა არ შვრება //
    if (!isVisible) {
      setIsVisible(true);
      setAppriciate(false);
    } else {
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      isValid &&
      !cardError &&
      !cvcError &&
      cardHolder &&
      cardNumber &&
      cardMonth &&
      cardYear &&
      cvc
    ) {
      setIsVisible(false);
      setAppriciate(true);
    } else {
    }
  };

  return (
    <>
      <div className="card-sides">
        <div className="frontSide">
          <div className="image">
            <img className="ovals" src={ovals} />
          </div>
          <div className="info">
            <div className="numbers">
              <h1 className="cardnums">
                {cardNumber || "0000 0000 0000 0000"}
              </h1>
            </div>
            <div className="name">
              <p className="name">{cardHolder || "JANE APPLESEED"}</p>
              <div className="values">
                <p>{cardMonth || "00"}</p>
                <p>/</p>
                <p>{cardYear || "00"}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="backSide">
          <div className="blackline"></div>
          <div className="cvv">
            <p>{cvc || "000"}</p>
          </div>
          <div className="linesdiv">
            <img className="liness" src={lines} />
          </div>
        </div>
      </div>
      <div>
        {isVisible && (
          <div className="secondside">
            <form onSubmit={handleSubmit}>
              <div>
                <label className="holder">CARDHOLDER NAME</label>
                <input
                  className={isValid ? "" : "input-error"}
                  type="text"
                  placeholder="e.g. Jane Appleseed"
                  onChange={handleCardholder}
                  value={cardHolder}
                />
                {!isValid && <p style={{ color: "red" }}>{error}</p>}
              </div>
              <div>
                <label className="cardnumbe">CARD NUMBER</label>
                <input
                  className={cardError ? "input-error" : ""}
                  type="number"
                  placeholder="e.g. 1234 5678 9123 0000"
                  onChange={handleCardnumber}
                  value={cardNumber}
                />
                {cardError && <p style={{ color: "red" }}>{cardError}</p>}
              </div>
              <div className="two">
                <div className="dates">
                  <label className="expiration">Exp. Date (MM/YY)</label>
                  <div className="rame">
                    <input
                      onChange={handleCardmonth}
                      type="number"
                      placeholder="MM"
                      value={cardMonth}
                      maxLength={2}
                    />
                    <input
                      onChange={handleCardYear}
                      type="number"
                      placeholder="YY"
                      value={cardYear}
                      maxLength={2}
                    />
                  </div>
                </div>
                <div className="cvc">
                  <label>CVC</label>
                  <input
                    className={cvcError ? "input-error" : ""}
                    onChange={handleCvc}
                    type="number"
                    placeholder="e.g. 123"
                    value={cvc}
                  />
                  {cvcError && <p style={{ color: "red" }}>{cvcError}</p>}
                </div>
              </div>
              <button type="submit" className="confirm">
                Confirm
              </button>
            </form>
          </div>
        )}
        {appriciate && (
          <div className="thankyoudiv">
            <div className="markdiv">
              <img src={mark} />
            </div>
            <div className="feed">
              <h1>THANK YOU!</h1>
              <span>We’ve added your card details</span>
            </div>
            <button onClick={MainPage} className="btn2">
              Continue
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default CardInfo;
