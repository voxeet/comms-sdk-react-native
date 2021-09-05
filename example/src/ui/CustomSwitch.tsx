import React, { Component } from "react";
import { Switch, Text, View } from "react-native";

export interface Props {
  textSelected: string,
  textUnselected: string,
  value?: boolean
  disabled?: boolean
  onValueChange: (value: boolean) => void
}

interface State {
  value: boolean
}

export default class CustomSwitch extends Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = { value: !!props.value};
  }

  private onValueChange = (value: boolean) => {
    const { onValueChange } = this.props;
    this.setState({value});
    !!onValueChange && onValueChange(value);
  }

  render() {
    const { textSelected, textUnselected } = this.props;
    const { value } = this.state;
    return (
      <View style={{margin: 8, flexDirection: "row", alignItems: "center"}}>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={value ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          { ...this.props }
          onValueChange={this.onValueChange}
          value={value}
        />

        <Text style={{marginLeft: 16}}>{ !!value ? textSelected : textUnselected }</Text>
      </View>);
  }
}