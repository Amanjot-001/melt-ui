import { ATTRS, DESCRIPTIONS, KBD, PROPS, SEE } from '$docs/constants';
import type { APISchema, KeyboardSchema, ReturnedProps } from '$docs/types';
import { toKebabCase } from '$docs/utils';
import { genElements, propsToOptions } from '$docs/utils/content';

export const menuBuilderProps = [
	PROPS.ARROW_SIZE,
	PROPS.DIR,
	PROPS.PREVENT_SCROLL,
	PROPS.CLOSE_ON_ESCAPE,
	PROPS.PORTAL,
	PROPS.CLOSE_ON_OUTSIDE_CLICK,
	PROPS.LOOP,
	PROPS.FORCE_VISIBLE,
	PROPS.DEFAULT_OPEN,
	PROPS.OPEN,
	PROPS.ON_OPEN_CHANGE,
];

export const menuBuilderOptions = [
	PROPS.POSITIONING(),
	PROPS.ARROW_SIZE,
	PROPS.DIR,
	PROPS.PREVENT_SCROLL,
	PROPS.CLOSE_ON_ESCAPE,
	PROPS.PORTAL,
	PROPS.CLOSE_ON_OUTSIDE_CLICK,
	PROPS.LOOP(),
	PROPS.FORCE_VISIBLE,
];

export function getMenuSchemas(name: string): Record<string, APISchema> {
	return {
		menu: getMenuMenuSchema(name),
		arrow: getMenuArrowSchema(name),
		submenuBuilder: getMenuSubmenuBuilderSchema(),
		submenu: getMenuSubmenuSchema(name),
		subTrigger: getMenuSubTriggerSchema(name),
		radioGroupBuilder: getMenuRadioGroupBuilderSchema(),
		radioGroup: getMenuRadioGroupSchema(name),
		radioItem: getMenuRadioItemSchema(name),
		checkboxItem: getMenuCheckboxItemSchema(name),
		separator: getMenuSeparatorSchema(name),
		item: getMenuItemSchema(name),
	};
}

export function getMenuBuilderReturns(name: string): Record<string, ReturnedProps> {
	return {
		elements: getMenuBuilderEls(name),
		builders: getMenuBuilderBuilders(name),
		states: getMenuBuilderStates(name),
		options: propsToOptions(name, menuBuilderOptions),
	};
}

function getMenuBuilderEls(name = 'menu') {
	return [
		{
			name: 'menu',
			description: `The builder store used to create the ${name}.`,
			link: '#menu',
		},
		{
			name: 'trigger',
			description: `The builder store used to create the ${name} trigger.`,
			link: '#trigger',
		},
		{
			name: 'checkboxItem',
			description: 'The builder store used to create a checkbox menu item.',
			link: '#checkboxitem',
		},
		{
			name: 'separator',
			description: 'The builder store used to create a separator menu item.',
			link: '#separator',
		},
		{
			name: 'arrow',
			description: `The builder store used to create the ${name} arrow.`,
			link: '#arrow',
		},
	];
}

function getMenuBuilderBuilders(name = 'menu') {
	return [
		{
			name: 'createSubmenu',
			description: `A builder function used to create a submenu for the ${name}.`,
			link: '#createsubmenu',
		},
		{
			name: 'createRadioGroup',
			description: `A builder function used to create a radio group for the ${name}.`,
			link: '#createradiogroup',
		},
		{
			name: 'createCheckboxItem',
			description: `A builder function used to create a checkbox menu item for the ${name}.`,
			link: '#createcheckboxitem',
		},
	];
}
function getMenuBuilderStates(name = 'menu') {
	return [
		{
			name: 'open',
			type: 'Readable<boolean>',
			description: `A readable store that indicates whether the ${name} is open.`,
		},
	];
}

export function getMenuTriggerDataAttrs(name: string) {
	return [
		{
			name: 'data-state',
			value: ATTRS.OPEN_CLOSED,
		},
		{
			name: `data-melt-context-menu-${name}`,
			value: ATTRS.MELT(name),
		},
	];
}

function getMenuMenuSchema(name: string): APISchema {
	return {
		title: 'menu',
		description: `The element which wraps the entire ${name}.`,
		dataAttributes: [
			{
				name: 'data-state',
				value: ATTRS.OPEN_CLOSED,
			},
			{
				name: `data-melt-${name.split(' ').join('-').toLowerCase()}`,
				value: ATTRS.MELT(name),
			},
		],
	};
}

export function getMenuArrowSchema(name: string): APISchema {
	return {
		title: 'arrow',
		description: `An optional arrow element which points to the ${name} trigger.`,
		dataAttributes: [
			{
				name: 'data-arrow',
				value: ATTRS.TRUE,
			},
			{
				name: `data-melt-${toKebabCase(name)}-arrow`,
				value: ATTRS.MELT('arrow'),
			},
		],
	};
}
function getMenuItemSchema(name: string): APISchema {
	return {
		title: 'item',
		description: 'A basic menu item.',
		props: [
			{
				name: 'disabled',
				type: 'boolean',
				description: 'Whether the item is disabled.',
				default: 'false',
			},
		],
		dataAttributes: [
			{
				name: 'data-orientation',
				value: ATTRS.ORIENTATION,
			},
			{
				name: `data-${toKebabCase(name)}-item`,
				value: ATTRS.MELT('item'),
			},
			{
				name: 'data-highlighted',
				value: ATTRS.HIGHLIGHTED('item'),
			},
		],
	};
}

function getMenuRadioGroupBuilderSchema() {
	return {
		title: 'createMenuRadioGroup',
		description: 'The configuration object passed to the `createMenuRadioGroup` builder function.',
		props: [
			{
				name: 'defaultValue',
				type: 'string',
				description: 'The value of the radio item to be selected by default.',
			},
			{
				name: 'value',
				type: 'Writable<string | null>',
				description:
					'A writable store which controls the value of the selected radio item. This will override the `defaultValue` prop if both are provided, so ensure to set your preferred default value as the default value of the store.',
				see: SEE.BRING_YOUR_OWN_STORE,
			},
			{
				name: 'onValueChange',
				type: 'ChangeFn<string | null>',
				description: DESCRIPTIONS.ON_CHANGE('value'),
				see: SEE.CHANGE_FUNCTIONS,
			},
		],
		elements: genElements('radio group', [
			{
				name: 'radioGroup',
				description: 'The builder store used to create the radio group.',
			},
			{
				name: 'radioItem',
				description: 'The builder store used to create a radio menu item.',
			},
		]),
		helpers: [
			{
				name: 'isChecked',
				type: 'Readable<(itemValue: string) => boolean>',
				description:
					'A derived store which returns a function that checks if a radio item is selected.',
			},
		],
		states: [
			{
				name: 'value',
				type: 'Readable<string | null>',
				description: 'A readable store containing the current value of the radio group.',
			},
		],
	};
}

export function getMenuSeparatorSchema(name: string): APISchema {
	return {
		title: 'separator',
		description: 'A horizontal line which separates menu items.',
		dataAttributes: [
			{
				name: `data-melt-${toKebabCase(name)}-separator`,
				value: ATTRS.MELT('separator'),
			},
		],
	};
}

function getMenuSubmenuBuilderSchema(): APISchema {
	return {
		title: 'createSubMenu',
		description: 'The builder function used to create submenus for context & dropdown menus.',
		props: [
			PROPS.POSITIONING({ default: 'placement: "right-start"' }),
			PROPS.ARROW_SIZE,
			PROPS.DISABLED({ name: 'submenu' }),
		],
		elements: genElements('submenu', [
			{
				name: 'subMenu',
				description: 'The builder store used to create the submenu.',
			},
			{
				name: 'subTrigger',
				description: 'The builder store used to create the submenu trigger.',
			},
			{
				name: 'arrow',
				description: 'The builder store used to create the submenu arrow.',
			},
		]),
		states: [
			{
				name: 'subOpen',
				type: 'Readable<boolean>',
				description: 'A readable store with the open state of the submenu.',
			},
		],
		options: propsToOptions('submenu', [PROPS.POSITIONING(), PROPS.ARROW_SIZE, PROPS.DISABLED]),
	};
}

function getMenuSubmenuSchema(name: string): APISchema {
	return {
		title: 'submenu',
		description: 'A submenu element displayed when its trigger is selected.',
		dataAttributes: [
			{
				name: 'data-state',
				value: ATTRS.OPEN_CLOSED,
			},
			{
				name: `data-melt-${toKebabCase(name)}-submenu`,
				value: ATTRS.MELT('submenu'),
			},
		],
	};
}

function getMenuCheckboxItemSchema(name: string): APISchema {
	return {
		title: 'checkboxItem',
		description: 'A checkbox menu item.',
		props: [
			{
				name: 'disabled',
				type: 'boolean',
				description: 'Whether or not the checkbox menu item is disabled.',
			},
		],
		dataAttributes: [
			{
				name: 'data-orientation',
				value: ATTRS.ORIENTATION,
			},
			{
				name: `data-melt-${toKebabCase(name)}-checkbox-item`,
				value: ATTRS.MELT('checkbox item'),
			},
			{
				name: 'data-highlighted',
				value: ATTRS.HIGHLIGHTED('checkbox item'),
			},
		],
	};
}

function getMenuRadioItemSchema(name: string): APISchema {
	return {
		title: 'radioItem',
		description: 'A radiogroup menu item.',
		props: [
			{
				name: 'value',
				type: 'string',
				description: 'The value of the radio item.',
				required: true,
			},
			{
				name: 'disabled',
				type: 'boolean',
				default: 'false',
				description: 'Whether the radio item is disabled.',
			},
		],
		dataAttributes: [
			{
				name: 'data-checked',
				value: ATTRS.CHECKED_UNCHECKED,
			},
			{
				name: 'data-disabled',
				value: ATTRS.DISABLED('radio item'),
			},
			{
				name: 'data-value',
				value: 'The value of the radio item.',
			},
			{
				name: 'data-orientation',
				value: ATTRS.ORIENTATION,
			},
			{
				name: `data-melt-${toKebabCase(name)}-radio-item`,
				value: ATTRS.MELT('radio item'),
			},
			{
				name: 'data-highlighted',
				value: ATTRS.HIGHLIGHTED('radio item'),
			},
		],
	};
}

function getMenuRadioGroupSchema(name: string): APISchema {
	return {
		title: 'radioGroup',
		description: 'A group of radio menu items.',
		dataAttributes: [
			{
				name: `data-melt-${toKebabCase(name)}-radio-group`,
				value: ATTRS.MELT('radio group'),
			},
		],
	};
}

function getMenuSubTriggerSchema(name: string): APISchema {
	return {
		title: 'subTrigger',
		description: 'A button which opens its associated submenu.',
		dataAttributes: [
			{
				name: 'data-state',
				value: ATTRS.OPEN_CLOSED,
			},
			{
				name: 'data-disabled',
				value: ATTRS.DISABLED('subtrigger'),
			},
			{
				name: `data-melt-${toKebabCase(name)}-subtrigger`,
				value: ATTRS.MELT('subtrigger'),
			},
			{
				name: 'data-highlighted',
				value: ATTRS.HIGHLIGHTED('subtrigger'),
			},
		],
	};
}

export function getMenuKeyboardSchema(): KeyboardSchema {
	return [
		{
			key: KBD.SPACE,
			behavior:
				'When focused on the `trigger`, opens the dropdown and focuses the first item. When focused on an `item`, selects the item.',
		},
		{
			key: KBD.ENTER,
			behavior:
				'When focused on the `trigger`, opens the dropdown and focuses the first item. When focused on an `item`, selects the item.',
		},
		{
			key: KBD.ARROW_DOWN,
			behavior:
				'When focused on the `trigger`, opens the dropdown and focuses the first item. When focused on an `item`, shifts focus to the next item.',
		},
		{
			key: KBD.ARROW_UP,
			behavior: 'When focused on an `item`, shifts focus to the next item..',
		},
		{
			key: KBD.ARROW_RIGHT,
			behavior: 'When focused on a `subTrigger`, opens the `subMenu` and focuses the first item.',
		},
		{
			key: KBD.ARROW_LEFT,
			behavior:
				"When focused on within a `subMenu`, closes the submenu and shifts focus to that submenu's `subTrigger`.",
		},
		{
			key: KBD.ESCAPE,
			behavior: 'Closes the dropdown menu and focuses the `trigger`.',
		},
	];
}
