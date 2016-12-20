import React, {
  PropTypes,
  Component,
} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';

import transPxToDp from '../util/transPxToDp';

const styles = StyleSheet.create({
  all: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopColor: '#C9C9C9',
    borderTopWidth: transPxToDp(1),
  },
});

class TabBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activedItemId: props.items[0].id,
    };
  }

  onPress() {
    if (this.context.state.activedItemId !== this.id) {
      const res = this.context.props.onChange(this.id);

      if (res === false) {
        return;
      }

      this.context.setState({
        activedItemId: this.id,
      });
    }
  }

  render() {
    return (
      <View style={[styles.all, this.props.style]}>
        {
          this.props.items.map((item, index) => (
            <TouchableOpacity
              key={index}
              id={item.id}
              context={this}
              onPress={this.onPress}
              activeOpacity={this.props.activeOpacity}
            >
              {
                this.state.activedItemId === item.id ?
                item.activedComponent : item.defaultComponent
              }
            </TouchableOpacity>
          ))
        }
      </View>
    );
  }
}

TabBar.propTypes = {
  // 自定义样式
  style: View.propTypes.style,
  // tab 项
  items: PropTypes.arrayOf(PropTypes.shape({
    // tab 项 id
    id: PropTypes.string,
    // tab 项默认元素
    defaultComponent: PropTypes.element,
    // tab 项激活元素
    activedComponent: PropTypes.element,
  })),
  // tab 项点击时透明度
  activeOpacity: PropTypes.number,
  // 改变激活项时的回调，激活项的 id 会作为参数传入。当该函数返回 false 时，可以阻止当前切换操作。
  onChange: PropTypes.func,
};
TabBar.defaultProps = {
  style: null,
  items: [{}],
  activeOpacity: 1,
  onChange: () => {},
};


export default TabBar;