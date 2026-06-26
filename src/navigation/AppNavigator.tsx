import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer, DarkTheme} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {enableScreens} from 'react-native-screens';
import {IconSymbol, type IconName} from '../components/IconSymbol';
import {AtelierScreen} from '../screens/AtelierScreen';
import {ContextScreen} from '../screens/ContextScreen';
import {SettingsScreen} from '../screens/SettingsScreen';
import {SocialScreen} from '../screens/SocialScreen';
import {useAppTheme} from '../theme/ThemeProvider';
import {spacing, typography} from '../theme/theme';

type RootTabParamList = {
  Context: undefined;
  Atelier: undefined;
  Social: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

enableScreens(false);

const tabConfig = {
  Context: {icon: 'context', label: 'Context'},
  Atelier: {icon: 'atelier', label: 'Atelier'},
  Social: {icon: 'social', label: 'Social'},
  Settings: {icon: 'settings', label: 'Settings'},
} satisfies Record<keyof RootTabParamList, {icon: IconName; label: string}>;

type TabIconProps = {
  routeName: keyof RootTabParamList;
  focused: boolean;
};

function TabIcon({routeName, focused}: TabIconProps) {
  const {colors} = useAppTheme();
  const config = tabConfig[routeName];

  return (
    <View style={styles.tabContent}>
      <IconSymbol
        name={config.icon}
        size={24}
        color={focused ? colors.text : colors.placeholder}
      />
      <Text
        style={[
          styles.tabLabel,
          {color: focused ? colors.text : colors.placeholder},
          focused ? styles.tabLabelActive : undefined,
        ]}>
        {config.label}
      </Text>
      <View
        style={[
          styles.indicator,
          focused ? {backgroundColor: colors.info} : undefined,
        ]}
      />
    </View>
  );
}

const commonScreenOptions = {
  headerShown: false,
  tabBarStyle: undefined,
  tabBarItemStyle: undefined,
  tabBarShowLabel: false,
};

const contextOptions = {
  tabBarIcon: ({focused}: {focused: boolean}) => (
    <TabIcon routeName="Context" focused={focused} />
  ),
};

const atelierOptions = {
  tabBarIcon: ({focused}: {focused: boolean}) => (
    <TabIcon routeName="Atelier" focused={focused} />
  ),
};

const socialOptions = {
  tabBarIcon: ({focused}: {focused: boolean}) => (
    <TabIcon routeName="Social" focused={focused} />
  ),
};

const settingsOptions = {
  tabBarIcon: ({focused}: {focused: boolean}) => (
    <TabIcon routeName="Settings" focused={focused} />
  ),
};

export function AppNavigator() {
  const {colors, isDark} = useAppTheme();
  const navigationTheme = {
    ...DarkTheme,
    dark: isDark,
    colors: {
      ...DarkTheme.colors,
      background: colors.background,
      card: colors.tabBar,
      border: colors.border,
      text: colors.text,
      primary: colors.info,
    },
  };

  return (
    <NavigationContainer theme={navigationTheme}>
      <Tab.Navigator
        initialRouteName="Context"
        screenOptions={{
          ...commonScreenOptions,
          headerShown: false,
          tabBarStyle: [
            styles.tabBar,
            {backgroundColor: colors.tabBar, borderTopColor: colors.border},
          ],
          tabBarItemStyle: styles.tabItem,
          tabBarShowLabel: false,
        }}>
        <Tab.Screen
          name="Context"
          component={ContextScreen}
          options={contextOptions}
        />
        <Tab.Screen
          name="Atelier"
          component={AtelierScreen}
          options={atelierOptions}
        />
        <Tab.Screen
          name="Social"
          component={SocialScreen}
          options={socialOptions}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={settingsOptions}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 72,
    borderTopWidth: 1,
    paddingTop: spacing.sm,
  },
  tabItem: {
    height: 60,
  },
  tabContent: {
    width: 84,
    height: 58,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  tabLabel: {
    ...typography.micro,
  },
  tabLabelActive: {
    fontWeight: '600',
  },
  indicator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'transparent',
    marginTop: 2,
  },
});
