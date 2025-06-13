import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create test users
  const user1 = await prisma.user.upsert({
    where: { email: 'john@example.com' },
    update: {},
    create: {
      email: 'john@example.com',
      name: 'John Doe',
    },
  })

  const user2 = await prisma.user.upsert({
    where: { email: 'jane@example.com' },
    update: {},
    create: {
      email: 'jane@example.com',
      name: 'Jane Smith',
    },
  })

  // Create test groups
  const group1 = await prisma.group.upsert({
    where: { email: 'manutd@charity.org' },
    update: {},
    create: {
      name: 'Manchester United Supporters',
      email: 'manutd@charity.org',
    },
  })

  const group2 = await prisma.group.upsert({
    where: { email: 'liverpool@charity.org' },
    update: {},
    create: {
      name: 'Liverpool FC Fans',
      email: 'liverpool@charity.org',
    },
  })

  // Create test campaigns
  const campaign1 = await prisma.campaign.create({
    data: {
      title: 'Manchester United Cards for Charity',
      description: 'Support local youth programs through Man United\'s card collection',
      goal: 5000,
      beneficiary: 'Local Youth Programs',
      yellowCardRate: 10,
      redCardRate: 50,
      yellowCards: 5,
      redCards: 2,
      currentAmount: 150,
      groupId: group1.id,
    },
  })

  const campaign2 = await prisma.campaign.create({
    data: {
      title: 'Liverpool FC Charity Drive',
      description: 'Help us raise money for children\'s hospitals through Liverpool\'s matches',
      goal: 3000,
      beneficiary: 'Children\'s Hospitals',
      yellowCardRate: 15,
      redCardRate: 75,
      yellowCards: 3,
      redCards: 1,
      currentAmount: 120,
      groupId: group2.id,
    },
  })

  const campaign3 = await prisma.campaign.create({
    data: {
      title: 'Arsenal Community Support',
      description: 'Support local community initiatives through Arsenal\'s season',
      goal: 4000,
      beneficiary: 'Community Initiatives',
      yellowCardRate: 12,
      redCardRate: 60,
      yellowCards: 4,
      redCards: 1,
      currentAmount: 108,
      groupId: group1.id,
    },
  })

  // Add some pledges
  await prisma.pledge.createMany({
    data: [
      {
        name: 'Alice',
        email: 'alice@example.com',
        phone: '123-456-7890',
        yellowCardRate: 10,
        redCardRate: 50,
        isAnonymous: false,
        campaignId: campaign1.id,
      },
      {
        name: 'Bob',
        email: 'bob@example.com',
        phone: '234-567-8901',
        yellowCardRate: 15,
        redCardRate: 75,
        isAnonymous: true,
        campaignId: campaign2.id,
      },
      {
        name: 'Charlie',
        email: 'charlie@example.com',
        phone: null,
        yellowCardRate: 12,
        redCardRate: 60,
        isAnonymous: false,
        campaignId: campaign3.id,
      },
    ],
  })

  // Add some donations
  await prisma.donation.createMany({
    data: [
      {
        amount: 100,
        campaignId: campaign1.id,
        donorId: user2.id,
      },
      {
        amount: 150,
        campaignId: campaign1.id,
        donorId: user1.id,
      },
      {
        amount: 200,
        campaignId: campaign2.id,
        donorId: user1.id,
      },
      {
        amount: 75,
        campaignId: campaign3.id,
        donorId: user2.id,
      },
    ],
  })

  console.log('Database has been seeded! 🌱')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 