import React from "react";

type AuxProps = {
  children?: React.JSX.Element[] | React.JSX.Element;
};
// function Container({ children }: Props) {
const Container = ({ children }: AuxProps): JSX.Element => (
  <div className="items-center m-auto px-1">{children}</div>
);

export default Container;
