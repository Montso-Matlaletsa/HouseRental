import {View, Text} from 'react-native';
import React, {FC} from 'react';
import {Input} from '@rneui/themed';
import Icon from 'react-native-vector-icons/EvilIcons';

interface TextInputProps {
  placeholder: string;
  onChange: (value: string) => void;
  icon: string;
  secure?: boolean;
  value: string;
  onBlur: (value: string) => void;
  multiline?: boolean;
  lines?: number;
  height?: number;
  type?: string;
}
const TextInput: FC<TextInputProps> = ({
  placeholder,
  onChange,
  icon,
  secure = false,
  value,
  onBlur,
  lines,
  multiline = false,
  height,
  type,
}) => {
  return (
    <View
      style={{
        marginLeft: 10,
        marginRight: 10,
      }}>
      <Input
        inputStyle={{
          height,
        }}
        // @ts-ignore
        keyboardType={type}
        multiline={multiline}
        numberOfLines={lines}
        onChangeText={onChange}
        inputContainerStyle={{
          borderColor: 'blue',
          borderWidth: 1,
          borderRadius: 6,
        }}
        style={{
          borderColor: 'blue',
        }}
        placeholder={placeholder}
        leftIcon={<Icon name={icon} color={'#6153CC'} size={35} />}
        secureTextEntry={secure}
        value={value}
        // @ts-ignore
        onBlur={onBlur}
      />
    </View>
  );
};

export default TextInput;
