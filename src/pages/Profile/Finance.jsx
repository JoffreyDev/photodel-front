import React from "react";
import { SelectInput, GreenButton } from "../../components";
import "../../styles/Profile/Finance.scss";
import Requests from "../../http/axios-requests";
import { useDispatch } from "react-redux";
import { openErrorAlert, openSuccessAlert } from "../../redux/actions/userData";

const Finance = () => {
  const [type, setType] = React.useState("standart");
  const [amount, setAmount] = React.useState("1");
  const [payments, setPayments] = React.useState("");

  const dispatch = useDispatch();

  const handlePay = () => {
    Requests.createPayment(
      Number(
        type === "standart"
          ? 499 * Number(amount)
          : type === "max"
          ? 1499 * amount
          : ""
      ),
      type,
      Number(amount)
    ).then((res) => (window.location = res.data.confirmation_url));
  };

  React.useEffect(() => {
    if (window.location.href.includes("?confirm")) {
      Requests.checkPayment()
        .then((res) => {
          dispatch(openSuccessAlert(res.data));
          setTimeout(() => {
            window.location.reload();
          }, 4000);
        })
        .catch((err) => openErrorAlert(err.response.data));
    }
  }, []);

  React.useEffect(() => {
    Requests.getPayments().then((res) => setPayments(res.data.payments));
  }, []);

  return (
    <div className="places">
      <div className="places_header">
        <h1 className="places_header_title">АККАУНТ PRO</h1>
      </div>
      <div className="finance_body">
        <h1 style={{ marginTop: "20px" }} className="places_header_title">
          Подписаться на PRO аккаунт
        </h1>
        <div className="finance_body_subscription">
          <SelectInput
            values={[
              {
                id: "standart",
                value: "Стандарт - 499р/месяц",
              },
              {
                id: "max",
                value: "Максимум - 1499р/месяц",
              },
            ]}
            value={type}
            onChange={(e) => setType(e.target.value)}
            label={"Тип подписки"}
            setValue={setType}
            width={"90%"}
          />
          <SelectInput
            values={[
              {
                id: "1",
                value: "1 месяц",
              },
              {
                id: "2",
                value: "2 месяца",
              },
              {
                id: "3",
                value: "3 месяца",
              },
            ]}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            label={"Количество месяцев"}
            setValue={setAmount}
            width={"90%"}
          />
        </div>
        <GreenButton
          width={"50%"}
          height={"38px"}
          text={`Оплатить ${
            type === "standart"
              ? 499 * Number(amount)
              : type === "max"
              ? 1499 * amount
              : ""
          } руб.`}
          callback={handlePay}
        />

        <h1 style={{ marginTop: "30px" }} className="places_header_title">
          История операций
        </h1>
        <div className="finance_body_history">
          {payments &&
            payments.map((item) => (
              <table>
                <tr>
                  <td style={{width: '100px'}} className="my_profile_common_data_content_left_li">
                    {item &&
                      item.date &&
                      `${
                        item.date.split("").splice(8, 2)[0] === "0"
                          ? item.date.split("").splice(9, 1).join("")
                          : item.date.split("").splice(8, 2).join("")
                      } ${
                        item.date.split("").splice(5, 2).join("") === "01"
                          ? "января"
                          : item.date.split("").splice(5, 2).join("") === "02"
                          ? "февраля"
                          : item.date.split("").splice(5, 2).join("") === "03"
                          ? "марта"
                          : item.date.split("").splice(5, 2).join("") === "04"
                          ? "апреля"
                          : item.date.split("").splice(5, 2).join("") === "05"
                          ? "мая"
                          : item.date.split("").splice(5, 2).join("") === "06"
                          ? "июня"
                          : item.date.split("").splice(5, 2).join("") === "07"
                          ? "июля"
                          : item.date.split("").splice(5, 2).join("") === "08"
                          ? "августа"
                          : item.date.split("").splice(5, 2).join("") === "09"
                          ? "сентября"
                          : item.date.split("").splice(5, 2).join("") === "10"
                          ? "октября"
                          : item.date.split("").splice(5, 2).join("") === "11"
                          ? "ноября"
                          : item.date.split("").splice(5, 2).join("") === "12"
                          ? "декабря"
                          : ""
                      }, ${item && item.date.split("").splice(11, 5).join("")}`}
                  </td>
                  <td style={{width: '100px'}} className="my_profile_common_data_content_right_li">
                    {item.value}руб.
                  </td>

                  <td style={{width: '100px'}} className="my_profile_common_data_content_right_li">
                    {item.duration} месяц(-а)
                  </td>

                  <td style={{width: '100px'}} className="my_profile_common_data_content_right_li">
                    {item.status === "succeeded"
                      ? "Успешно"
                      : item.status === "pending"
                      ? "Ожидание"
                      : item.status === "canceled"
                      ? "Отклонен"
                      : ""}
                  </td>
                </tr>
              </table>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Finance;
