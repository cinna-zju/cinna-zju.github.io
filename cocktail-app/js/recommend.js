// 趣味推荐算法模块

const calculateMatchScore = (cocktail, animal, color) => {
  let score = 0
  const animalTrait = ANIMAL_TRAITS[animal]
  const colorTrait = COLOR_TRAITS[color]

  if (animalTrait.spirits.includes(cocktail.baseSpirit)) {
    score += 40
  }

  if (animalTrait.alcoholLevel === 'high' && cocktail.alcoholContent >= 25) {
    score += 20
  } else if (animalTrait.alcoholLevel === 'low' && cocktail.alcoholContent < 15) {
    score += 20
  } else if (animalTrait.alcoholLevel === 'medium' && cocktail.alcoholContent >= 15 && cocktail.alcoholContent < 25) {
    score += 20
  }

  const flavorMatches = animalTrait.flavors.filter(f => cocktail.flavor.includes(f))
  score += flavorMatches.length * 10

  const allIngredients = cocktail.ingredients.map(i => i.name).join(' ')
  const garnishText = cocktail.garnish || ''
  const allText = `${allIngredients} ${garnishText} ${cocktail.name} ${cocktail.nameEn}`

  for (const keyword of colorTrait.keywords) {
    if (allText.includes(keyword)) {
      score += 30
      break
    }
  }

  score += Math.random() * 20 - 10

  return score
}

const getRecommendation = () => {
  if (!selectedAnimal || !selectedColor) {
    return null
  }

  if (!allCocktails || allCocktails.length === 0) {
    console.error('鸡尾酒数据未加载')
    return null
  }

  const scores = allCocktails.map(cocktail => ({
    cocktail,
    score: calculateMatchScore(cocktail, selectedAnimal, selectedColor)
  }))

  scores.sort((a, b) => b.score - a.score)

  return scores[0].cocktail
}
