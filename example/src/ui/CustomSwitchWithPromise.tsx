import React, { Component } from "react";
import { Switch, Text, View } from "react-native";

export interface Props {
  textSelected: string,
  textUnselected: string,
  value?: boolean
  disabled?: boolean
  onValueChange: (value: boolean) => Promise<boolean>,
}

interface State {
  value: boolean,
  flush?: boolean
}

export default class CustomSwitchWithPromise extends Component<Props, State> {

  private deactivated: boolean = false;
  private last?: boolean = undefined;

  constructor(props: Props) {
    super(props);
    this.state = { value: !!props.value};
    this.deactivated = false;
  }

  private onValueChange = (value: boolean) => {
    if(this.deactivated) {
      if(!!this.state.flush) this.setState({flush: false});
    } else if(!this.deactivated) {
      const { onValueChange } = this.props;
      this.deactivated = true;
      this.setState({value});
      onValueChange(value).then(value => {
        this.deactivated = false;
        this.setState({value, flush: true});
      }).catch(error => {
        console.error("CustomSwitchWithPromise error", error);
        this.deactivated = false;
        this.setState({value, flush: true});
      });
    }
  }

  render() {
    const { textSelected, textUnselected, disabled } = this.props;
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
          disabled={disabled || this.deactivated}
        />

        <Text style={{marginLeft: 16}}>{ !!value ? textSelected : textUnselected }</Text>
      </View>);
  }
}