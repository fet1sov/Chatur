import { SplashButton } from "src/frontend/types/SplashNotification/SplashButton";
import { i18n } from "../../i18n";

const { t } = i18n.global;

export const BUTTONS_OK_CANCEL : Array<SplashButton> = [
    {
        placeholder: t("splash.buttons.ok"),
        class: '',
        name: 'ok'
    },
    {
        placeholder: t("splash.buttons.cancel"),
        class: 'bg-tomato-primary text-lighttheme-primary-primary',
        name: 'cancel'
    }
] as Array<SplashButton>;