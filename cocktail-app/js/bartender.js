// 酒保问候模块

const changeGreeting = () => {
  const bubble = document.querySelector('.speech-bubble')
  if (!bubble || !elements.greetingText) return

  bubble.classList.add('fade-out')

  setTimeout(() => {
    const randomIndex = Math.floor(Math.random() * GREETINGS.length)
    elements.greetingText.textContent = GREETINGS[randomIndex]

    bubble.classList.remove('fade-out')
  }, 300)
}
