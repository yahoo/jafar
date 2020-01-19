export default {
  codeToLabel: {
    func: props => (props.value ? props.args.source.find(x => x.code === props.value).label : undefined),
  },
  labelToCode: {
    func: props => (props.value ? props.args.source.find(x => x.label === props.value).code : undefined),
  },
};
