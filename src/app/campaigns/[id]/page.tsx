import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import Navigation from '@/components/Navigation'

async function getCampaign(id: string) {
  const campaign = await prisma.campaign.findUnique({
    where: { id },
    include: {
      group: true,
      pledges: true,
      donations: true,
    },
  })

  if (!campaign) {
    notFound()
  }

  return campaign
}

export default async function CampaignPage({ params }: { params: { id: string } }) {
  const campaign = await getCampaign(params.id)

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <div className="mb-6">
            <Link
              href="/campaigns"
              className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeftIcon className="h-5 w-5 mr-2" />
              <span>Back to Campaigns</span>
            </Link>
          </div>

          {/* Campaign Header */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{campaign.title}</h1>
            <p className="text-gray-600 mb-6">{campaign.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Campaign Details</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Beneficiary:</span>
                    <span className="font-medium">
                      {campaign.beneficiaryUrl ? (
                        <a
                          href={campaign.beneficiaryUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 hover:underline"
                        >
                          {campaign.beneficiary}
                        </a>
                      ) : (
                        campaign.beneficiary
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Created by:</span>
                    <span className="font-medium">{campaign.group.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Created on:</span>
                    <span className="font-medium">
                      {new Date(campaign.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Progress</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Goal:</span>
                    <span className="font-medium">${campaign.goal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Raised:</span>
                    <span className="font-medium">${campaign.currentAmount}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{ width: `${(campaign.currentAmount / campaign.goal) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card Rates */}
            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Card Rates</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-md font-medium text-gray-900 mb-2">Yellow Cards</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Rate:</span>
                      <span className="font-medium">${campaign.yellowCardRate} per card</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Cards:</span>
                      <span className="font-medium">{campaign.yellowCards}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Amount:</span>
                      <span className="font-medium">
                        ${(campaign.yellowCardRate * campaign.yellowCards).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-md font-medium text-gray-900 mb-2">Red Cards</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Rate:</span>
                      <span className="font-medium">${campaign.redCardRate} per card</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Cards:</span>
                      <span className="font-medium">{campaign.redCards}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Amount:</span>
                      <span className="font-medium">
                        ${(campaign.redCardRate * campaign.redCards).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pledges and Donations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Pledges</h2>
                <div className="space-y-4">
                  {campaign.pledges.map((pledge) => (
                    <div key={pledge.id} className="border-b border-gray-200 pb-4 last:border-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">
                            {pledge.isAnonymous ? 'Anonymous' : pledge.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            Yellow: ${pledge.yellowCardRate} | Red: ${pledge.redCardRate}
                          </p>
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(pledge.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Donations</h2>
                <div className="space-y-4">
                  {campaign.donations.map((donation) => (
                    <div key={donation.id} className="border-b border-gray-200 pb-4 last:border-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">${donation.amount}</p>
                          <p className="text-sm text-gray-600">
                            Donor ID: {donation.donorId}
                          </p>
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(donation.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4">
              <Link
                href={`/campaigns/${params.id}/pledge`}
                className="px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Make a Pledge
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 