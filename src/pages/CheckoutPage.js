import React from "react";
import styled from "styled-components";
import { PageHero } from "../components";

const CheckoutPage = () => {
    return (
        <main>
            <PageHero title="checkout" />
            <Wrapper className="page">
              <h1>this is the checkout page</h1>
            </Wrapper>
        </main>
    );
};
const Wrapper = styled.div`
    h1{
        text-align: center;
    }
`;
export default CheckoutPage;
