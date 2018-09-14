// TypeScript Version: 2.3
import { ComponentClass, SFC } from "react";

export type OptionalThemeProps<Props, Theme> = Props & { theme?: Theme };

export interface ThemeProviderProps<Theme> {
    theme: Partial<Theme> | ((theme: Theme) => Theme);
}

export type ThemeProviderComponent<Theme> = ComponentClass<ThemeProviderProps<Theme>>;
export const ThemeProvider: ThemeProviderComponent<object>;

/**
 * Inject theme into component
 */
// tslint:disable-next-line:no-unnecessary-generics
export function withTheme<Props, Theme = {}>(component: ComponentClass<Props> | SFC<Props>): ComponentClass<OptionalThemeProps<Props, Theme>>;

export interface EmotionThemingModule<Theme> {
    ThemeProvider: ThemeProviderComponent<Theme>;
    withTheme<Props>(component: ComponentClass<Props> | SFC<Props>): ComponentClass<OptionalThemeProps<Props, Theme>>;
}

export const channel: "__EMOTION_THEMING__";

export type BroadcastListener<Theme = {}> = (state: Theme) => void;

export interface Broadcast<Theme = {}> {
    publish(nextState: Theme): void;
    subscribe(listener: BroadcastListener<Theme>): number;
    unsubscribe(unsubID: number): void;
}

export function createBroadcast<Theme = {}>(initialState: Theme): Broadcast<Theme>;
