/*
Ricreiamo un feed social aggiungendo al layout di base fornito,
il nostro script JS in cui:

- Milestone 1 - Analizziamo la struttura dati fornita

- Milestone 2 - Prendendo come riferimento il layout di esempio
presente nell'html, stampiamo i post del nostro feed.

- Milestone 3 - Se clicchiamo sul tasto "Mi Piace"
cambiamo il colore al testo del bottone
e incrementiamo il counter dei likes relativo.

- Salviamo in un secondo array gli id dei post ai quali abbiamo messo il like.


BONUS
1. Formattare le date in formato italiano (gg/mm/aaaa)
2. Gestire l'assenza dell'immagine profilo
con un elemento di fallback che contiene le iniziali dell'utente
(es. Luca Formicola > LF).
3. Al click su un pulsante "Mi Piace" di un post,
se abbiamo già cliccato dobbiamo decrementare il contatore e cambiare il colore del bottone.
*/

const posts = [
	{
		id: 1,
		content:
			"Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
		media: "https://unsplash.it/600/300?image=171",
		author: {
			name: "Phil Mangione",
			image: "https://unsplash.it/300/300?image=15",
		},
		likes: 80,
		created: "2021-06-25",
	},
	{
		id: 2,
		content:
			"Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
		media: "https://unsplash.it/600/400?image=112",
		author: {
			name: "Sofia Perlari",
			image: "https://unsplash.it/300/300?image=10",
		},
		likes: 120,
		created: "2021-09-03",
	},
	{
		id: 3,
		content:
			"Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
		media: "https://unsplash.it/600/400?image=234",
		author: {
			name: "Chiara Passaro",
			image: "https://unsplash.it/300/300?image=20",
		},
		likes: 78,
		created: "2021-05-15",
	},
	{
		id: 4,
		content:
			"Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
		media: "https://unsplash.it/600/400?image=24",
		author: {
			name: "Luca Formicola",
			image: null,
		},
		likes: 56,
		created: "2021-04-03",
	},
	{
		id: 5,
		content:
			"Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
		media: "https://unsplash.it/600/400?image=534",
		author: {
			name: "Alessandro Sainato",
			image: "https://unsplash.it/300/300?image=29",
		},
		likes: 95,
		created: "2021-03-05",
	},
];

// declaring DOM variables
// const parentBody = document.querySelector("body");
const parentContainer = document.getElementById("container");

// iterate on array to generate all posts
posts.forEach((post) => {
	// const postElement = document.createElement("div");
	// postElement.className = "post";
	createPost(post);
	// postElement.innerHTML = createPost(post);
});

// FUNCTIONS DEFINITION
function createPost(post) {
	// Create post container
	const postElement = document.createElement("div");
	postElement.className = "post";
	parentContainer.appendChild(postElement);

	// Create post header
	const postHeader = document.createElement("div");
	postHeader.className = "post__header";
	postElement.appendChild(postHeader);

	// Create post meta
	const postMeta = document.createElement("div");
	postMeta.className = "post-meta";
	postHeader.appendChild(postMeta);

	// Create post meta icon
	const postMetaIcon = document.createElement("div");
	postMetaIcon.className = "post-meta__icon";
	postMeta.appendChild(postMetaIcon);

	// Create profile picture
	if (post.author.image !== null) {
		const profilePic = document.createElement("img");
		profilePic.className = "profile-pic";
		profilePic.src = post.author.image;
		profilePic.alt = post.author.name;
		postMetaIcon.appendChild(profilePic);
	} else {
		const profilePic = document.createElement("span");
		profilePic.className = "profile-pic-default";
		profilePic.innerHTML = makeInitials(post.author.name);
		postMetaIcon.appendChild(profilePic);
	}

	// Create post meta data
	const postData = document.createElement("div");
	postData.className = "post-meta__data";
	postMeta.appendChild(postData);

	// Create author name
	const authorName = document.createElement("div");
	authorName.className = "post-meta__author";
	authorName.textContent = post.author.name;
	postData.appendChild(authorName);

	// Create post time with reverse date
	const time = document.createElement("div");
	time.className = "post-meta__time";
	time.innerHTML = reverseDate(post.created);
	postData.appendChild(time);

	// Create post text
	const postText = document.createElement("div");
	postText.className = "post__text";
	postText.textContent = post.content;
	postElement.appendChild(postText);

	// Create post image
	const postImage = document.createElement("div");
	postImage.className = "post__image";
	postElement.appendChild(postImage);

	// Create image
	const image = document.createElement("img");
	image.src = post.media;
	image.alt = "";
	postImage.appendChild(image);

	// Create post footer
	const postFooter = document.createElement("div");
	postFooter.className = "post__footer";
	postElement.appendChild(postFooter);

	// Create likes container
	const likesContainer = document.createElement("div");
	likesContainer.className = "likes js-likes";
	postFooter.appendChild(likesContainer);

	// Create likes call to action
	const likesCta = document.createElement("div");
	likesCta.className = "likes__cta";
	likesContainer.appendChild(likesCta);

	// Create like button
	const likeButton = document.createElement("a");
	likeButton.className = "like-button js-like-button";
	likeButton.href = "#";
	likeButton.dataset.postid = post.id;
	likesCta.appendChild(likeButton);

	// Create like button icon
	const likeButtonIcon = document.createElement("i");
	likeButtonIcon.className = "like-button__icon fas fa-thumbs-up";
	likeButtonIcon.setAttribute("aria-hidden", "true");
	likeButton.appendChild(likeButtonIcon);

	// Create like button label
	const likeButtonLabel = document.createElement("span");
	likeButtonLabel.className = "like-button__label";
	likeButtonLabel.textContent = " Mi Piace";
	likeButton.appendChild(likeButtonLabel);

	// call function to add Event Listener and modify class and likes
	addLikesCtaEventListener(likeButton, post);

	// Create likes counter
	const likesCounter = document.createElement("div");
	likesCounter.className = "likes__counter";
	likesCounter.innerHTML = `Piace a <b id="like-counter-${post.id}" class="js-likes-counter">${post.likes}</b> persone`;
	likesContainer.appendChild(likesCounter);

	// RETURN HTML POST
	return postElement;
}

function reverseDate(oldDate) {
	const arrDate = oldDate.split("-");
	const date = `${arrDate[2]}-${arrDate[1]}-${arrDate[0]}`;
	return date;
}

// addEventListener to likes button
// that toggles class,
// increments or decrements the likes
function addLikesCtaEventListener(likeButton, post) {
	// Add event listener to like button
	likeButton.addEventListener("click", function (event) {
		event.preventDefault();

		// Toggle liked class on like button element
		likeButton.classList.toggle("like-button--liked");

		// Find post in posts array
		const postIndex = posts.findIndex(function (post) {
			return post.id === parseInt(likeButton.dataset.postid);
		});

		// Increment or decrement post.likes
		if (likeButton.classList.contains("like-button--liked")) {
			posts[postIndex].likes++;
		} else {
			posts[postIndex].likes--;
		}

		// Update likes counter text
		document.querySelector(`#like-counter-${post.id}`).textContent =
			posts[postIndex].likes;
	});
}

function makeInitials(name) {
	const arrName = name.split(" ");
	const initFirst = arrName[0].charAt(0);
	const initLast = arrName[1].charAt(0);
	const nameInit = `${initFirst}${initLast}`.toUpperCase();
	return nameInit;
}
