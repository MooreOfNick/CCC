'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function createGroupCampaign(formData: FormData) {
  const groupName = formData.get('groupName') as string
  const groupEmail = formData.get('groupEmail') as string
  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const beneficiary = formData.get('beneficiary') as string
  const goal = parseFloat(formData.get('goal') as string)

  try {
    // Create or update the group
    const group = await prisma.group.upsert({
      where: { email: groupEmail },
      update: { name: groupName },
      create: {
        name: groupName,
        email: groupEmail,
      },
    })

    // Create the campaign
    const campaign = await prisma.campaign.create({
      data: {
        title,
        description,
        beneficiary,
        goal,
        groupId: group.id,
      },
    })

    revalidatePath('/')
    return { success: true, campaign }
  } catch (error) {
    console.error('Error creating campaign:', error)
    return { success: false, error: 'Failed to create campaign' }
  }
}

export async function createPledge(formData: FormData, campaignId: string) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const phone = formData.get('phone') as string
  const yellowCardRate = parseFloat(formData.get('yellowCardRate') as string)
  const redCardRate = parseFloat(formData.get('redCardRate') as string)
  const isAnonymous = formData.get('isAnonymous') === 'on'

  try {
    const pledge = await prisma.pledge.create({
      data: {
        name: isAnonymous ? 'Anonymous' : name,
        email,
        phone: phone || null,
        yellowCardRate,
        redCardRate,
        isAnonymous,
        campaignId,
      },
    })

    revalidatePath(`/campaigns/${campaignId}`)
    return { success: true, pledge }
  } catch (error) {
    console.error('Error creating pledge:', error)
    return { success: false, error: 'Failed to create pledge' }
  }
} 