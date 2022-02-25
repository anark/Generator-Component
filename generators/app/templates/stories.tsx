import <%=componentName %>, { Props } from './<%=componentName%>'

export default {
  title: '<%=componentPath%>',
  component: <%=componentName %>,
}

export const Default = ({ ...rest }: Props) => <<%=componentName%> {...rest} />
