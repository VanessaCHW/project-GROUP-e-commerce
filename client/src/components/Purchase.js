import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { ProductsContext } from './ProductsContext';
import { useDispatch } from 'react-redux';
import { clearCart } from './action';

const Purchase = () => {
  const { setConfirmation } = useContext(ProductsContext);
  const storeItems = useSelector((state) => state);
  const [total, setTotal] = useState(0);
  const [form, setFormValue] = useState({});
  const [error, setError] = useState(null);
  const [formError, setFormError] = useState(null);
  let history = useHistory();
  const dispatch = useDispatch();

  // Calculate order total
  useEffect(() => {
    if (storeItems) {
      let sum = 0;
      Object.values(storeItems).map((item) => {
        sum += item.price.slice(1).replace(',', '') * item.quantity;
      });
      setTotal(sum.toFixed(2));
    }
  }, [storeItems]);

  const formVerification = () => {
    if (!form.name.includes(' ')) {
      setFormError('Please include full name');
      return false;
    }
    if (!form.email.includes('.') || !form.email.includes('@')) {
      setFormError('Please include email');
      return false;
    }
    if (!form.cardName.includes(' ')) {
      setFormError('Please include cardholder full name');
      return false;
    }
    if (isNaN(parseInt(form.credit))) {
      setFormError('Please enter credit cart number');
      return false;
    }
    if (isNaN(parseInt(form.cvv)) || form.cvv.length != 3) {
      setFormError('Please enter cvv (must be 3 digits).');
      return false;
    }
    setFormError(null);
    return true;
  };

  const handleFormChange = (fieldName, value) => {
    setFormValue({ ...form, [fieldName]: value });
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();

    let noError = formVerification();

    if (storeItems && noError) {
      let data = Object.values(storeItems).map((item) => {
        return { id: item._id, qty: item.quantity };
      });
      data = { items: data, form: form };

      fetch('/api/purchase', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.status === 200) {
            setConfirmation(res.data);
            setFormError(null);
            dispatch(clearCart());
            history.push('./confirmation');
          } else {
            setError({ error: res.error, data: res.data });
          }
        })
        .catch((error) => console.log(error.message));
    }
  };

  return (
    <Wrapper>
      <div className="pageTitle">Review your order</div>
      <form className="theForm">
        <div>
          <Section>
            <div className="Title">Address & personal info</div>
            <Label>
              <LabelTitle>Full Name</LabelTitle>
              <Input
                required
                type="text"
                onChange={(ev) => handleFormChange('name', ev.target.value)}
              />
            </Label>
            <Label>
              <LabelTitle>Address</LabelTitle>
              <Input
                required
                type="text"
                onChange={(ev) => handleFormChange('address', ev.target.value)}
              />
            </Label>
            <Label>
              <LabelTitle>City</LabelTitle>
              <Input
                required
                type="text"
                onChange={(ev) => handleFormChange('city', ev.target.value)}
              />
            </Label>
            <Label>
              <LabelTitle>Province</LabelTitle>
              <select
                required
                className="Select"
                onChange={(ev) => {
                  handleFormChange('province', ev.target.value);
                }}
              >
                <option disabled selected></option>
                <option value="Alberta">Alberta</option>
                <option value="BritishColumbia">British Columbia</option>
                <option value="Manitoba">Manitoba</option>
                <option value="NewBrunswick">New Brunswick</option>
                <option value="NovaScotia">Nova Scotia</option>
                <option value="Ontario">Ontario</option>
                <option value="PrinceEdwardIsland">Prince Edward Island</option>
                <option value="Quebec">Quebec</option>
                <option value="Saskatchewan">Saskatchewan</option>
              </select>
            </Label>
            <Label>
              <LabelTitle>Postal Code</LabelTitle>
              <Input
                required
                type="text"
                onChange={(ev) =>
                  handleFormChange('postalcode', ev.target.value)
                }
              />
            </Label>
            <Label>
              <LabelTitle>Country</LabelTitle>
              <div className="country">Canada</div>
            </Label>
            <Label>
              <LabelTitle>Email</LabelTitle>
              <Input
                required
                type="email"
                onChange={(ev) => handleFormChange('email', ev.target.value)}
              />
            </Label>
          </Section>
          <Section>
            <div className="Title">Payment info</div>
            <Label>
              <LabelTitle>Cardholder name</LabelTitle>
              <Input
                required
                type="text"
                onChange={(ev) => handleFormChange('cardName', ev.target.value)}
              />
            </Label>
            <Label>
              <LabelTitle>Credit card number</LabelTitle>
              <Input
                required
                type="text"
                onChange={(ev) => handleFormChange('credit', ev.target.value)}
              />
            </Label>
            <Label>
              <LabelTitle>CVV</LabelTitle>
              <Input
                required
                type="text"
                onChange={(ev) => handleFormChange('cvv', ev.target.value)}
              />
            </Label>
            <Label>
              <LabelTitle>Expiration date</LabelTitle>
              <Input
                required
                type="text"
                placeholder="MM/YY"
                onChange={(ev) =>
                  handleFormChange('expiration', ev.target.value)
                }
              />
            </Label>
          </Section>

          <Section className="items">
            <div className="Title">Cart</div>
            {Object.values(storeItems).map((item) => (
              <TinyItem>
                <Img src={item.imageSrc} />
                <div className="itemText">
                  <div className="itemTitle">{item.name}</div>
                  <div className="price">{item.price}</div>
                  <div className="qty">- Quantity: {item.quantity}</div>
                </div>
              </TinyItem>
            ))}
          </Section>
        </div>
        <PurchaseBox>
          <Button
            type="submit"
            disabled={
              total > 0 && Object.values(form).length === 10 ? false : true
            }
            onClick={(ev) => handleSubmit(ev)}
            value="Place your order"
          />
          {formError ? (
            <div>
              <div className="problem">Your order was not processed</div>
              <div className="formProblem">{formError}</div>
            </div>
          ) : null}
          {error ? (
            <div>
              <div className="problem">Your order was not processed</div>
              {error.error === 'stock' ? (
                <div className="problem">Please review your cart</div>
              ) : (
                <div className="problem">The form is incomplete</div>
              )}
            </div>
          ) : null}
          {error ? (
            error.error === 'stock' ? (
              <div>
                {error.data.map((item) => {
                  return (
                    <div>
                      <div>
                        <b>{item.name}</b>
                      </div>
                      <div>Requested: {item.requested}</div>
                      <div>Available: {item.stock}</div>
                    </div>
                  );
                })}
              </div>
            ) : null
          ) : null}

          <div className="orderTotal">
            <div>Order total: </div>
            <div>${total}</div>
          </div>
        </PurchaseBox>
      </form>
    </Wrapper>
  );
};
const PurchaseBox = styled.div`
  width: 320px;
  border: 1px solid #dddddd;
  margin: 10px 14px;
  padding: 10px 10px 10px 10px;

  .orderTotal {
    font-weight: 500;
    font-size: 1.5rem;
    padding-top: 0.7rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-top: 2px solid #dddddd;
  }
  .problem {
    font-weight: 500;
    font-size: 1.2rem;
    color: #e4324c;
    padding-top: 15px;
  }
  .formProblem {
    font-style: italic;
    color: #990000;
    padding-bottom: 1rem;
  }
`;
const Button = styled.input`
  font-size: 1.2rem;
  width: 100%;
  background-color: #f4b95f;
  &:hover:enabled {
    cursor: pointer;
  }
`;
const Wrapper = styled.div`
  .theForm {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
  }
  .pageTitle {
    font-size: 2rem;
    width: 1130px;
    margin: auto;
    padding: 1.2rem 0 0.5rem 0;
    font-weight: 500;
  }
  .Title {
    font-size: 1.2rem;
    font-weight: 500;
    padding: 10px;
  }
  .country {
    display: inline-block;
    width: 350px;
  }
  .Select {
    width: 350px;
  }
  .items {
    text-align: left;
    justify-content: left;
  }
`;
const Section = styled.div`
  border: 1px solid #dddddd;
  width: 800px;
  margin: 10px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px 0 20px 0;
`;
const Label = styled.div`
  display: flex;
  margin: 5px 0;
`;
const LabelTitle = styled.div`
  width: 160px;
  text-align: right;
  margin-right: 15px;
`;
const Input = styled.input`
  width: 350px;
`;
const Img = styled.img`
  height: 50px;
  width: 50px;
`;
const TinyItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  .itemText {
    width: 500px;
    padding: 5px 10px;
  }
  .itemTitle {
    font-weight: 500;
  }
  .qty,
  .price {
    display: inline;
    padding-right: 4px;
  }
  .price {
    color: #990000;
    font-weight: 500;
  }
`;
export default Purchase;
