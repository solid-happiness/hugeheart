import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import GridListMaterialUI from '@material-ui/core/GridList';
import GridListTileMaterialUI from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import getDishDescription from './dishDescription';
import defaultDishBackground from './hot-dish-icon.svg';

const MenuGroupContainer = styled(ExpansionPanel)`
    && {
        margin-top: 15px;
        width: 100%;
        border-radius: 4px;
    }
`;

const Summary = styled(Typography)`
    && {
        font-size: 1.1rem;
        font-weight: 400;
    }
`;

const GridList = styled(GridListMaterialUI)`
    && {
        justify-content: center;
    }
`;

const GridListTile = styled(GridListTileMaterialUI)`
    && {
        min-width: 250px;
    }
`;

const DescriptionParagraph = styled.p`
    && {
        margin: 0;
    }
`;

const MenuGroup = ({ menuGroup, addToCart }) => (
  <MenuGroupContainer>
    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
      <Summary variant="body1" color="primary">
        {menuGroup.name}
      </Summary>
    </ExpansionPanelSummary>
    <ExpansionPanelDetails>
      <GridList>
        {menuGroup.dishes.map(dish => (
          <GridListTile key={dish.id}>
            <img src={dish.photo || defaultDishBackground} alt="" />
            <GridListTileBar
              title={dish.name}
              subtitle={getDishDescription(dish).map(str => (
                <DescriptionParagraph key={str}>
                  {str}
                </DescriptionParagraph>
              ))}
              actionIcon={(
                <IconButton
                  onClick={() => addToCart(dish)}
                >
                  <FontAwesomeIcon
                    icon={faShoppingBasket}
                    color="white"
                  />
                </IconButton>
)}
            />
          </GridListTile>
        ))}
      </GridList>
    </ExpansionPanelDetails>
  </MenuGroupContainer>
);

MenuGroup.propTypes = {
  menuGroup: PropTypes.object.isRequired,
  addToCart: PropTypes.func.isRequired,
};

export default MenuGroup;
