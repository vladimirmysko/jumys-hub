import { Text, type TextProps } from '@radix-ui/themes';

export function Logo(props: TextProps) {
  return (
    <Text as="span" size="3" weight="bold" {...props}>
      Jumys Hub
    </Text>
  );
}
