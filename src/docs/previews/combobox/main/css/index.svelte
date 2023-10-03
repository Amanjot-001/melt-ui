<script lang="ts">
	import { createCombobox, melt } from '$lib/index.js';
	import { Check, ChevronDown, ChevronUp } from 'lucide-svelte';
	import { fly } from 'svelte/transition';

	const {
		elements: { menu, input, option, label },
		states: { open, inputValue, touchedInput },
		helpers: { isSelected },
	} = createCombobox({
		forceVisible: true,
	});

	type Manga = {
		author: string;
		title: string;
		disabled: boolean;
	};

	let mangas: Manga[] = [
		{
			author: 'Kentaro Miura',
			title: 'Berserk',
			disabled: false,
		},
		{
			author: 'Hajime Isayama',
			title: 'Attack on Titan',
			disabled: false,
		},
		{
			author: 'Junji Ito',
			title: 'Uzumaki',
			disabled: false,
		},
		{
			author: 'Yomi Sarachi',
			title: 'Steins Gate',
			disabled: false,
		},
		{
			author: 'Tite Kubo',
			title: 'Bleach',
			disabled: false,
		},
		{
			author: 'Masashi Kishimoto',
			title: 'Naruto',
			disabled: true,
		},
		{
			author: 'Katsura Hoshino',
			title: 'D.Gray Man',
			disabled: false,
		},
		{
			author: 'Tsugumi Ohba',
			title: 'Death Note',
			disabled: false,
		},
		{
			author: 'ONE',
			title: 'Mob Psycho 100',
			disabled: false,
		},
		{
			author: 'Hiromu Arakawa',
			title: 'Fullmetal Alchemist',
			disabled: false,
		},
	];

	$: filteredMangas = $touchedInput
		? mangas.filter(({ title, author }) => {
				const normalizedInput = $inputValue.toLowerCase();
				return (
					title.toLowerCase().includes(normalizedInput) ||
					author.toLowerCase().includes(normalizedInput)
				);
		  })
		: mangas;
</script>

<div class="root">
	<label use:melt={$label}>
		<span class="label">Choose your favorite manga:</span>
	</label>

	<div class="relative">
		<input
			use:melt={$input}
			class="input"
			placeholder="Best book ever"
		/>
		<div class="absolute">
			{#if $open}
				<ChevronUp class="chevron-up" />
			{:else}
				<ChevronDown class="chevron-down" />
			{/if}
		</div>
	</div>
</div>
{#if $open}
	<ul class="menu">
		<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
		<div class="entry" tabindex="0">
			{#each filteredMangas as book, index (index)}
				<li
					use:melt={$option}
					class="option"
				>
					{#if $isSelected(book)}
						<div class="check">
							<Check class="check-icon" />
						</div>
					{/if}
					<div class="text">
						<span class="title">{book.title}</span>
						<span class="author">{book.author}</span>
					</div>
				</li>
			{:else}
				<li class="no-results">
					No results found
				</li>
			{/each}
		</div>
	</ul>
{/if}

<style>
    /* Reset */
	* {
		all: unset;
	}

	/* CSS Variables */
	:root {
		--magnum-50: #fff9ed;
		--magnum-100: #fef2d6;
		--magnum-200: #fce0ac;
		--magnum-300: #f9c978;
		--magnum-400: #f7b155;
		--magnum-500: #f38d1c;
		--magnum-600: #e47312;
		--magnum-700: #bd5711;
		--magnum-800: #964516;
		--magnum-900: #793a15;
		--magnum-950: #411c09;

		--neutral-50: #fafafa;
		--neutral-100: #f5f5f5;
		--neutral-200: #e5e5e5;
		--neutral-300: #d4d4d4;
		--neutral-400: #a3a3a3;
		--neutral-500: #737373;
		--neutral-600: #525252;
		--neutral-700: #404040;
		--neutral-800: #262626;
		--neutral-900: #171717;
		--neutral-950: #0a0a0a;

		--shadow-xl: 0 0 #0000, 0 0 #0000, 0 10px 15px -3px rgb(0 0 0 / 0.1),
			0 4px 6px -4px rgb(0 0 0 / 0.1);

		--fs-xs: 0.75rem;
		--fs-sm: 0.875rem;
		--fs-base: 1rem;
		--fs-lg: 1.125rem;
		--fs-xl: 1.25rem;
		--fs-2xl: 1.5rem;
		--fs-3xl: 1.875rem;
		--fs-4xl: 2.25rem;
		--fs-5xl: 3rem;
		--fs-6xl: 4rem;
		--fs-7xl: 5rem;
		--fs-8xl: 6rem;
		--fs-9xl: 8rem;

		--fw-thin: 100;
		--fw-extralight: 200;
		--fw-light: 300;
		--fw-normal: 400;
		--fw-medium: 500;
		--fw-semibold: 600;
		--fw-bold: 700;
		--fw-extrabold: 800;
		--fw-black: 900;

		--radius-sm: 0.125rem;
		--radius-base: 0.25rem;
		--radius-md: 0.375rem;
		--radius-lg: 0.5rem;
		--radius-xl: 0.75rem;
		--radius-2xl: 1rem;
		--radius-3xl: 1.5rem;
		--radius-full: 9999px;

		--lh-none: 1;
	}

	.root {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.root .label {
		color: var(--magnum-900);
		font-size: var(--fs-sm);
		font-weight: var(--fw-medium);
		line-height: 1.25rem; 
	}

	.relative {
		position: relative;
	}

	.input {
		display: flex;
		height: 2.5rem;
		align-items: center;
		justify-content: space-between;
		border-radius: var(--radius-lg);
		background-color: var(--neutral-50);
		padding-left: 0.75rem;
		padding-right: 0.75rem; 
		padding-right: 3rem; 
		color: var(--neutral-950);
	}

	.absolute {
		position: absolute;
		right: 0.5rem;
		top: 50%;
		z-index: 10;
		/* transform: translateY(-50%); */
		color: var(--magnum-900);
		/* font-weight: var(--fw-semibold); */
	}

	.chevron-up, .chevron-down, .check-icon {
		width: 2rem !important;
  		height: 2rem !important;
	}

	.menu {
		z-index: 10;
		display: flex;
		max-height: 300px;
		flex-direction: column;
		overflow: hidden;
		border-radius: var(--radius-lg);
	}

	.entry {
		display: flex;
		max-height: 100%;
		flex-direction: column;
		gap: 0;
		overflow-y: auto;
		background-color: var(--neutral-50);
		padding: 0.5rem;
		color: var(--neutral-950);
	}

	.option {
		position: relative;
		cursor: pointer;
		scroll-margin-top: 0.5rem;
		scroll-margin-bottom: 0.5rem;
		border-radius: var(--radius-md);
		padding: 0.5rem 1rem;
	}

	.option[data-highlighted="true"] {
  		background-color: var(--magnum-200);
  		color: var(--magnum-900);
	}

	.option[data-disabled="true"] {
  		opacity: 0.5;
	}

	.check {
		position: absolute;
  		left: 0.5rem;	
  		top: 50%;
  		/* transform: translateY(-50%); */
  		z-index: 10;
  		color: var(--magnum-900);
  		font-weight: var(--fw-semibold);
    	transform: translateY(-50%) translateX(1px);
    	color: var(--magnum-500);
	}

	.text {
		padding-left: 1rem;
	}

	.title {
		font-weight: var(--fw-medium);
	}

	.author {
		display: block;
		font-size: var(--fs-sm);
		opacity: 0.75;
	}

	.no-results {
		position: relative;
		cursor: pointer;
		border-radius: var(--radius-md);
		padding: 0.25rem 1rem 2rem 0.25rem;
	}

	.no-results[data-highlighted="true"] {
		background-color: var(--magnum-100);
		color: var(--magnum-700);
	}

</style> 
