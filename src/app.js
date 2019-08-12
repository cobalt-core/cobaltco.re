import "./assets/logo.png";
import "./assets/ref-exoscale.png";
import "./assets/ref-passions.png";
import "./style.scss";

import { dom, library } from "@fortawesome/fontawesome-svg-core";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faLanguage } from "@fortawesome/free-solid-svg-icons";

library.add(
    faEnvelope,
    faLanguage,
    faLinkedin,
);

dom.watch();
