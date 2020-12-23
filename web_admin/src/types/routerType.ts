export interface IRouters {
  path: string;
  title: string;
  components: () => React.ReactNode;
  icon: () => JSX.Element;
}
