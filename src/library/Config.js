import { ConfigType } from "../types/library";
import { PRODUCTION_CONFIG } from "../environment/prod";
import { DEVELOPMENT_CONFIG } from "../environment/dev";
import { TEST_CONFIG } from "../environment/stage";


// please use CI tools replace following string, or edit it in other branch

export const Config: ConfigType = DEVELOPMENT_CONFIG;
