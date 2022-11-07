import React from 'react';
import f3 from 'family-chart'; // intall family-chart library
import './family-chart.css'; // create file 'family-chart.css' in same directory, copy/paste css from examples/create-tree
import type { FamilyChart } from './types';

type Props = {
  data: FamilyChart[];
};

export default class FamilyTree extends React.Component<Props> {
  cont = React.createRef<HTMLDivElement>();
  store: any = null;

  // Render the family tree when component is mounted
  componentDidMount() {
    if (!this.cont.current) return;

    console.log(this.props.data, 'this.props.data');

    this.store = f3.createStore({
      data: this.props.data,
      node_separation: 250,
      level_separation: 150,
    });
    const view = f3.d3AnimationView({
        store: this.store,
        cont: document.querySelector('#FamilyChart'),
      }),
      Card = f3.elements.Card({
        store: this.store,
        svg: view.svg,
        card_dim: {
          w: 220,
          h: 70,
          text_x: 75,
          text_y: 15,
          img_w: 60,
          img_h: 60,
          img_x: 5,
          img_y: 5,
        },
        card_display: [
          (d: FamilyChart) => `${d.data['label'] || ''}`,
          (d: FamilyChart) => `${d.data['gender'] || ''}`,
        ],
        mini_tree: false,
        link_break: true,
      });

    view.setCard(Card);
    this.store?.setOnUpdate((props: any) => view.update(props || {}));
    this.store?.update.tree({ initial: true });
  }

  // Render the family tree when component is updated
  componentDidUpdate() {
    this.store.update.data(this.props.data);
    this.store.update.tree();
  }

  render() {
    return <div className="f3" id="FamilyChart" ref={this.cont}></div>;
  }
}
