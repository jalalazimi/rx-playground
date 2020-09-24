import React from "react";
import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { flash, clock } from "ionicons/icons";
import Tab1 from "./pages/Tab1";
import Tab2 from "./pages/Tab2";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import { SmartSpinner } from "./components/presentational/SmartSpinner";
import BgrCounter from "./services/BackgroundTasksCounter";

const styles = {
  position: "absolute",
  top: "60vh",
  left: "calc(50% - 75px)"
};

export class App extends React.Component {
  constructor() {
    super();
    this.state = {
      tasks: 0
    };

    BgrCounter.connect(tasks => this.setState({ tasks }));
  }

  render() {
    return (
      <IonApp>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Solve problems reactively</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonReactRouter>
          <IonTabs>
            <IonRouterOutlet>
              <Route path="/tab1" component={Tab1} exact={true} />
              <Route path="/tab2" component={Tab2} exact={true} />
              <Route exact path="/" render={() => <Redirect to="/tab1" />} />
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
              <IonTabButton tab="tab1" href="/tab1">
                <IonIcon icon={clock} />
                <IonLabel>Slow tasks</IonLabel>
              </IonTabButton>
              <IonTabButton tab="tab2" href="/tab2">
                <IonIcon icon={flash} />
                <IonLabel>Quick tasks</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonReactRouter>
        <div style={styles}>Background tasks: {this.state.tasks}</div>
        <SmartSpinner></SmartSpinner>
      </IonApp>
    );
  }
}

export default App;
