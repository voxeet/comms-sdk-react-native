import React, { Component } from "react";
import { Text, View } from "react-native";
import { Card as CardClass} from "react-native-material-ui";

export interface Props {
  title: string;
}

interface State {

}

export default class Card extends Component<Props, State> {
  public render() {
    const { title, children } = this.props;
    return (
      <View>
        <CardClass>
          <View style={{padding: 16}}>
            <Text style={{fontSize: 18, fontWeight: "bold", marginBottom: 16}}>{title}</Text>
            <View>
              {children}
            </View>
          </View>
        </CardClass>
      </View>
    )
  }
}