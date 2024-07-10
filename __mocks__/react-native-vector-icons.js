import React from 'react';
import { Text } from 'react-native';

const Icon = ({ name, style }) => <Text style={style}>{name}</Text>;

export default Icon;
export const createIconSetFromFontello = () => Icon;
export const createIconSetFromIcoMoon = () => Icon;
export const createMultiStyleIconSet = () => Icon;
export const createIconSet = () => Icon;
export const createMuStyleIconSet = () => Icon;
export const createSimpleLineIcons = () => Icon;
export const createMaterialCommunityIcons = () => Icon;
