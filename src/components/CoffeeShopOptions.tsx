import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { gql, useMutation } from "@apollo/client";
import styled from "styled-components/native";
import { Modal, Button } from "react-native";

const Background = styled.TouchableOpacity`
  flex: 1;
  justify-content: flex-end;
  background-color: #000000aa;
`;
const PopupContainer = styled.View`
  border-radius: 16px;
  margin: 0px 20px 80px;
  background-color: ${(props) => props.theme.contentBackgroundColor};
`;
const OptionRow = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  padding: 10px;
`;
const OptionText = styled.Text`
  font-size: 18px;
  color: ${(props) => props.theme.fontColor};
`;

const DELETE_COFFEESHOP_MUTATION = gql`
  mutation deleteCoffeeShop($id: Int!) {
    deleteCoffeeShop(id: $id) {
      ok
      error
    }
  }
`;

interface Props {
  isOption: number;
  setIsOption: any;
}

const CoffeeShopOptions: React.FC<Props> = ({ isOption, setIsOption }) => {
  const navigation = useNavigation();
  const id = useState(isOption)[0];
  const [deleteCoffeeShop] = useMutation(DELETE_COFFEESHOP_MUTATION);

  const deleteShopHandler = () => {
    deleteCoffeeShop({
      variables: { id },
      update: (cache, result) => {
        const {
          data: {
            deleteCoffeeShop: { ok },
          },
        } = result;
        if (ok) {
          cache.evict({ id: `CoffeeShop:${id}` });
        }
      },
    });
    setIsOption(null);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isOption !== null ? true : false}
      onRequestClose={() => setIsOption(null)}
    >
      <Background onPress={() => setIsOption(null)}>
        <PopupContainer>
          <OptionRow
            onPress={() => {
              navigation.navigate("CoffeeShopEdit", { id });
              setIsOption(null);
            }}
          >
            <OptionText>Edit thit Coffee Shop</OptionText>
          </OptionRow>
          <OptionRow onPress={deleteShopHandler}>
            <OptionText style={{ color: "tomato" }}>
              Delete this Coffee Shop
            </OptionText>
          </OptionRow>
          <Button title="Close" onPress={() => setIsOption(null)} />
        </PopupContainer>
      </Background>
    </Modal>
  );
};

export default CoffeeShopOptions;
