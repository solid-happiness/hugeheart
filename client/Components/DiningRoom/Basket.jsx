import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Dialog from '@material-ui/core/Dialog';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Card from '@material-ui/core/Card';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBasket, faPlus } from '@fortawesome/free-solid-svg-icons';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import getDishDescription from './dishDescription';

const SummariesCard = styled(Card)`
  && {
    display: flex;
    align-items: center;
    margin: 20px 15px;
    padding: 15px;
    justify-content: center;

    @media screen and (max-width: 720px) {
        flex-direction: column;
        align-items: stretch;
    }
  }
`;

const SummariesTitle = styled(Typography)`
    && {
        font-weight: 500;
    }
`;

const AddToCartIcon = styled(FontAwesomeIcon)`
    && {
        width: 21px;
        height: 21px;
    }
`;

const AddToCartButton = styled(Fab)`
  && {
      position: fixed;
      right: 25px;
      bottom: 25px;
      z-index: 999;
  }
`;

const СheckoutButton = styled(Button)`
  && {
    max-height: 48px;
    max-width: 175px;

    @media screen and (max-width: 720px) {
      align-self: center;
    }
  }
`;

const GoodsNumbers = styled.div`
  position: absolute;
  top: -5px;
  right: -5px;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background-color: red;
`;

const DishesContainer = styled.div`
    top: 50%;
    left: 50%;
    position: absolute;
    width: 80%;
    transform: translate(-50%, -50%);
    background: whitesmoke;
    text-align: center;
    max-height: 90%;
    overflow-y: auto;

    @media screen and (max-width: 320px) {
        width: 100%;
    }

    @media screen and (max-width: 480px) {
        width: 95%;
    }
`;

const DishCard = styled(Card)`
    && {
        display: grid;
        grid: 150px / 30% 1fr;
        margin: 15px 25px;
        position: relative;
        overflow: visible;
    }
`;

const DescriptionParagraph = styled(Typography)`
    && {
        margin-top: 3px;
        text-align: left;
    }
`;

const EmptyBasketMessage = styled(Typography)`
    && {
        margin: 15px 20px;
    }
`;

const DeleteButton = styled(IconButton)`
    && {
        position: absolute;
        top: -8px;
        right: -8px;
        background-color: rgba(255, 0, 0, 1);
        transform: rotate(45deg);
        width: 25px;
        height: 25px;
        padding: 0;

        &:hover {
            background-color: rgba(255, 0, 0, 0.75);
        }
    }
`;

const DeleteIcon = styled(FontAwesomeIcon)`
    && {
        display: block;
        width: 16px;
        height: 16px;
    }
`;

const CheckoutDialogText = styled(DialogContentText)`
  && {
    width: 300px;
    margin: 15px 10px;
    text-align: center;

    @media screen and (max-width: 480px) {
      width: 70vw;
    }
  }
`;

const Basket = ({
  diningRoomName,
  selectedDishes,
  setShowCart,
  showCart,
  onDelete,
}) => {
  const [showCheckoutAlert, setShowCheckoutAlert] = React.useState(false);
  const summaries = selectedDishes.reduce(
    (acc, dish) => ({
      price: acc.price + dish.price,
      proteins: acc.proteins + dish.proteins,
      fats: acc.fats + dish.fats,
      carbohydrates: acc.carbohydrates + dish.carbohydrates,
      calorific: acc.calorific + dish.calorific,
    }),
    {
      price: 0,
      proteins: 0,
      fats: 0,
      carbohydrates: 0,
      calorific: 0,
    },
  );

  summaries.price = summaries.price.toFixed(1);
  summaries.proteins = summaries.proteins.toFixed(1);
  summaries.fats = summaries.fats.toFixed(1);
  summaries.carbohydrates = summaries.carbohydrates.toFixed(1);
  summaries.calorific = summaries.calorific.toFixed(1);

  return (
    <>
      <AddToCartButton
        variant="round"
        color="primary"
        onClick={() => setShowCart(true)}
      >
        <AddToCartIcon icon={faShoppingBasket} />
        <GoodsNumbers>{selectedDishes.length}</GoodsNumbers>
      </AddToCartButton>
      <Dialog
        open={showCheckoutAlert}
      >
        <CheckoutDialogText>
          {`Ваш заказ успешно оформлен и ожидает в столовой «‎${diningRoomName}»‎`}
        </CheckoutDialogText>
        <DialogActions>
          <Button
            color="primary"
            onClick={() => {
              setShowCheckoutAlert(false);
              setShowCart(false);
              onDelete([]);
            }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
      <Modal
        open={showCart}
        onClose={() => setShowCart(false)}
      >
        <DishesContainer>
          {selectedDishes.length === 0 && (
            <EmptyBasketMessage>
              Корзина пуста. Пожалуйства, выберите товары.
            </EmptyBasketMessage>
          )}
          {selectedDishes.length !== 0 && (
            <SummariesCard>
              <CardContent>
                <div>
                  <SummariesTitle variant="body1" align="left" inline>
                    Итоговая стоимость:
                  </SummariesTitle>
                  <Typography variant="body2" inline>
                    {` ${summaries.price} руб.`}
                  </Typography>
                </div>
                <div>
                  <SummariesTitle variant="body1" align="left" inline>
                      Общее К/Б/Ж/У:
                  </SummariesTitle>
                  <Typography variant="body2" inline>
                    {` ${summaries.calorific}/${summaries.proteins}/${summaries.fats}/${summaries.carbohydrates}`}
                  </Typography>
                </div>
              </CardContent>
              {/* eslint-disable-next-line react/jsx-pascal-case */}
              <СheckoutButton
                color="primary"
                variant="contained"
                onClick={() => setShowCheckoutAlert(true)}
              >
                Оформить заказ
              </СheckoutButton>
            </SummariesCard>
          )}
          {selectedDishes.map(dish => (
            <DishCard key={dish.key}>
              <DeleteButton onClick={() => onDelete(
                selectedDishes.filter(selectedDish => selectedDish.key !== dish.key),
              )}
              >
                <DeleteIcon icon={faPlus} color="white" />
              </DeleteButton>
              <CardMedia image={dish.photo} title={dish.name} />
              <CardContent>
                {getDishDescription(dish).map(str => (
                  <DescriptionParagraph key={str}>
                    {str}
                  </DescriptionParagraph>
                ))}
              </CardContent>
            </DishCard>
          ))}
        </DishesContainer>
      </Modal>
    </>
  );
};

Basket.defaultProps = {
  diningRoomName: '',
  selectedDishes: [],
  setShowCart: () => {},
  showCart: false,
  onDelete: () => {},
};

Basket.propTypes = {
  diningRoomName: PropTypes.string,
  selectedDishes: PropTypes.array,
  setShowCart: PropTypes.func,
  showCart: PropTypes.bool,
  onDelete: PropTypes.func,
};

export default Basket;
